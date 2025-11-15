from django.shortcuts import render
from django.core.mail import send_mail
import os
from .serializer import RegisterSerializer, DebtorSerializer,AddDebtorSerializer,HistorySerializer,AddDebtSerializer,DebtSerializer, PayDebtSerializer, DeleteDebtorSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Debt,Debtor,History
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['firstname'] = user.first_name
        token['lastname'] = user.last_name
        token['email'] = user.email
        
        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Send email function
# def sendMail(email, subject, message):
#     send_mail(
#         subject= subject, #subject,
#         message= message,   # message
#         from_email=os.environ.get('EMAIL_HOST_USER'),
#         recipient_list= [email]

#     )

#Register user
@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
#         message = f"""
#         Hi {request.data.get('first_name')},

#         Welcome to FinLedger! 🎉

# Your account has been created successfully. You can now log in and start managing debts with ease. 

# If you didn't sign up for this account, please ignore this message.

# Thank you for joining us!

#         – The FinLedger Team
#         """
#         sendMail(request.data.get('email'),"Welcome to finledger! 🎉",message,)
        return Response({'message':'User created Successfully'},status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Add Debtor
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_debtor(request):
    serializer = AddDebtorSerializer(data = request.data, context={'request':request})
    if serializer.is_valid():
        debtor = serializer.save()
        response_serializer = DebtorSerializer(debtor)
        # TO:DO-- Alert debtor through text message
        return Response({'message':response_serializer.data},status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST )


# Delete debtor
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_debtor(request):
    serializer = DeleteDebtorSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        result = serializer.save()
        return Response(result, status=200)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Add Debt
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_debt(request):
    serializer = AddDebtSerializer(data = request.data, context={'request':request})
    if serializer.is_valid():
        debt = serializer.save()
        response_serializer = DebtSerializer(debt)
        # TO:DO-- Alert debtor through text message
        return Response({'message':response_serializer.data},status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST )


# pay Debt
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def pay_debt(request):
    serializer = PayDebtSerializer(data = request.data, context={'request':request})
    if serializer.is_valid():
        serializer.save()
        # TO:DO-- Alert debtor through text message
        return Response({'message':"Debt paid successfully"},status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST )




# ------------------------------ GET ------------------------------


# Fetch Debtors
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def fetch_debtors(request):
    debtors = Debtor.objects.filter(creditor = request.user).order_by('-created_at')
    serializer = DebtorSerializer(debtors, many=True)
    return Response(serializer.data)


# Fetch Debts
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def fetch_debts(request):
    debts = Debt.objects.filter(creditor = request.user)
    serializer = DebtSerializer(debts, many=True)
    return Response(serializer.data)


# Fetch History
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def fetch_history(request):
    history = History.objects.filter(creditor = request.user).order_by("-recorded_at")
    serializer = HistorySerializer(history, many=True)
    return Response(serializer.data)
