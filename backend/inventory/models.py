from enum import Enum
from decimal import Decimal

from django.db import models
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
from django.utils import timezone


class ChoiceEnum(Enum):
    @classmethod
    def choices(cls):
        return tuple((x.name, x.value) for x in cls)


class TxType(ChoiceEnum):
    PURCHASED = 'purchased'
    SOLD = 'sold'


class Sku(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=500)
    base_units = models.CharField(max_length=24)
    current_quantity = models.DecimalField(max_digits=16, decimal_places=2,
                                           validators=[MinValueValidator(Decimal('0.00'))], default=Decimal('0.00'))
    def __str__(self):
        return self.name


class Transaction(models.Model):
    sku = models.ForeignKey(Sku, related_name='transactions')
    tx_type = models.CharField(
        max_length=20, choices=TxType.choices(), default=TxType.PURCHASED)
    quantity = models.DecimalField(max_digits=16, decimal_places=2,
                                   validators=[MinValueValidator(Decimal('0.01'))], null=False)
    total_cost = models.DecimalField(max_digits=16, decimal_places=2,
                                     validators=[MinValueValidator(Decimal('0.01'))], default=Decimal('0.00'))
    client = models.CharField(max_length=200, null=False)
    tx_date = models.DateTimeField(default=timezone.now)

    def clean(self):
        if self.tx_type == 'SOLD' and \
           self.sku.current_quantity - self.quantity <= 0:
            raise ValidationError({'quantity': 'This transaction causes a negative inventory value for the sku.'})


    def save(self, *args, **kwargs):
        sku = Sku.objects.get(pk=self.sku.id)
        if self.tx_type == 'PURCHASED':
            sku.current_quantity += self.quantity
        elif self.tx_type == 'SOLD':
            sku.current_quantity -= self.quantity 
        sku.save()
        super(Transaction, self).save(*args, **kwargs)
            