from django.http import HttpResponse
from rest_framework import viewsets

from inventory.models import Sku, Transaction
from inventory.serializers import SkuSerializer, TransactionSerializer


def index(request):
    return HttpResponse("Hello world. You're at the inventory index.")


class SkuViewSet(viewsets.ModelViewSet):
    '''
    API endpoint that allows Skus to be viewed or edited.
    '''
    queryset = Sku.objects.all()
    serializer_class = SkuSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    '''
    API endpoint that allows Transactions to be viewed or edited.
    '''
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
