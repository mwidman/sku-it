from rest_framework import serializers

from inventory.models import Sku, Transaction


class SkuSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Sku
        fields = ('name', 'description', 'base_units', 'current_quantity')


class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Transaction
        fields = ('tx_type', 'quantity', 'total_cost', 'tx_date')
