from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Debtor(models.Model):
    creditor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='debtors')
    fullname = models.CharField(null=False, max_length=200)
    phone = models.CharField(max_length=13)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.fullname
    
class Debt(models.Model):
    creditor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='debts')
    debtor = models.ForeignKey(Debtor, on_delete=models.CASCADE, related_name='debts')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    paid = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    desc = models.TextField(blank=True)
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
          return f"{self.debtor} - {self.amount}"
    
class DebtPayment(models.Model):
     debt = models.ForeignKey(Debt, on_delete=models.CASCADE)
     amount_paid = models.DecimalField(max_digits=10,decimal_places=2)
     date = models.DateTimeField(auto_now_add=True)
    
class History(models.Model):
    creditor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='history')
    debtor = models.ForeignKey(Debtor, on_delete=models.CASCADE, related_name='history')
    debt = models.ForeignKey(Debt,on_delete=models.CASCADE, related_name='history')
    is_payment = models.BooleanField(default=False)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    recorded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
          return f"{self.debtor} - {self.amount}"
     