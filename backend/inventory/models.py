from enum import Enum
from decimal import Decimal

from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone


class ChoiceEnum(Enum):
    @classmethod
    def choices(cls):
        return tuple((x.name, x.value) for x in cls)


class TxType(ChoiceEnum):
    PURCHASED = 'purchased'
    SOLD = 'sold'


'''
class Units(models.Model):
    name = models.CharField(max_length=100)


class UnitsConversion(models.Model):
    from_units = models.ForeignKey(Units, on_delete=models.CASCADE, related_name='from_units')
    to_units = models.ForeignKey(Units, on_delete=models.CASCADE, related_name='to_units')
    factor = models.DecimalField(max_digits=6, decimal_places=2
        validators=[MinValueValidator(Decimal('0.01'))])
'''


class Sku(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    #base_units = models.OneToOneField(Units, on_delete=models.SET_NULL, null=True)
    base_units = models.CharField(max_length=24)
    current_quantity = models.DecimalField(max_digits=16, decimal_places=2,
                                           validators=[MinValueValidator(Decimal('0.00'))], default=Decimal('0.00'))


class Transaction(models.Model):
    sku = models.ForeignKey(Sku)
    tx_type = models.CharField(
        max_length=20, choices=TxType.choices(), default=TxType.PURCHASED)
    quantity = models.DecimalField(max_digits=16, decimal_places=2,
                                   validators=[MinValueValidator(Decimal('0.01'))], null=False)
    total_cost = models.DecimalField(max_digits=16, decimal_places=2,
                                     validators=[MinValueValidator(Decimal('0.01'))], default=Decimal('0.00'))
    client = models.CharField(max_length=200, null=False)
    tx_date = models.DateTimeField(default=timezone.now)
