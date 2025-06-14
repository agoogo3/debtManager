from django.shortcuts import render
from .serializer import RegisterSerializer, DebtorSerializer,AddDebtorSerializer,HistorySerializer,AddDebtSerializer,DebtSerializer, PayDebtSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Debt,Debtor,History

# Create your views here.

#Register user
@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message':'User created Successfully'},status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Add Debtor
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_debtor(request):
    serializer = AddDebtorSerializer(data = request.data, context={'request':request})
    if serializer.is_valid():
        serializer.save()
        # TO:DO-- Alert debtor through text message
        return Response({'message':"Debtor added successfully"},status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST )

# Add Debt
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_debt(request):
    serializer = AddDebtSerializer(data = request.data, context={'request':request})
    if serializer.is_valid():
        serializer.save()
        # TO:DO-- Alert debtor through text message
        return Response({'message':"Debt added successfully"},status=status.HTTP_201_CREATED)
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



# Fetch Debtors
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def fetch_debtors(request):
    debtors = Debtor.objects.filter(creditor = request.user)
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
    history = History.objects.filter(creditor = request.user)
    serializer = HistorySerializer(history, many=True)
    return Response(serializer.data)
