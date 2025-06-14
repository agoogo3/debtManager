from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
     path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.register_user, name='register_user'),
    path('add_debt/', views.add_debt, name='add_debt'),
    path('add_debtor/', views.add_debtor, name='add_debtor'),
    path('pay_debt/', views.pay_debt, name='pay_debt'),
    path('fetch_debtors/', views.fetch_debtors, name='fetch_debtors'),
    path('fetch_debts/', views.fetch_debts, name='fetch_debts'),
    path('fetch_history/', views.fetch_history, name='fetch_history'),

]
