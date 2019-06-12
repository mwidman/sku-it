from django.contrib import admin

from .models import Sku, Transaction

admin.site.register(Sku)
admin.site.register(Transaction)
