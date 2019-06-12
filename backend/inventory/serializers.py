from rest_framework import serializers

from inventory.models import Sku, Transaction


class TransactionSerializer(serializers.HyperlinkedModelSerializer):

    sku = serializers.PrimaryKeyRelatedField(queryset=Sku.objects.all())

    class Meta:
        model = Transaction
        resource_name='transactions'
        fields = ('id', 'sku', 'tx_type', 'quantity', 'client', 'total_cost', 'tx_date')
    
    def create(self, validated_data):
        print('validated_data = %s' % validated_data)
        print('sku = %s' % validated_data['sku'])
        obj = Transaction.objects.create(**validated_data)
        obj.save()
        return obj

    def validate(self, attrs):
        obj = Transaction(**attrs)
        obj.clean()
        return attrs

class SkuSerializer(serializers.HyperlinkedModelSerializer):
    transactions = TransactionSerializer(many=True, read_only=True)

    class Meta:
        model = Sku
        resource_name = 'skus'
        fields = ('id', 'name', 'description', 'base_units', 'current_quantity', 'transactions')
