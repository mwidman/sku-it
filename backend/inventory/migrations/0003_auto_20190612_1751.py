# -*- coding: utf-8 -*-
# Generated by Django 1.11.21 on 2019-06-12 17:51
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0002_auto_20190610_0522'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='sku',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to='inventory.Sku'),
        ),
    ]
