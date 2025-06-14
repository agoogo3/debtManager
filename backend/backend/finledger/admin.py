from django.contrib import admin
from .models import Debt,Debtor,History

# Register your models here.
admin.site.register(Debt)
admin.site.register(Debtor)
admin.site.register(History)
