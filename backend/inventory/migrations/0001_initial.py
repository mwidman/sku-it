# -*- coding: utf-8 -*-
# Generated by Django 1.11.21 on 2019-06-10 00:35
from __future__ import unicode_literals

from decimal import Decimal
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import inventory.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sku',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=500)),
                ('base_units', models.CharField(max_length=24)),
                ('current_quantity', models.DecimalField(decimal_places=2, max_digits=16, validators=[django.core.validators.MinValueValidator(Decimal('0.00'))])),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tx_type', models.CharField(choices=[('PURCHASED', 'purchased'), ('SOLD', 'sold')], default=inventory.models.TxType('purchased'), max_length=20)),
                ('quantity', models.DecimalField(decimal_places=2, max_digits=16, validators=[django.core.validators.MinValueValidator(Decimal('0.01'))])),
                ('total_cost', models.DecimalField(decimal_places=2, default=Decimal('0.00'), max_digits=16, validators=[django.core.validators.MinValueValidator(Decimal('0.01'))])),
                ('client', models.CharField(max_length=200)),
                ('tx_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('sku', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventory.Sku')),
            ],
        ),
    ]
