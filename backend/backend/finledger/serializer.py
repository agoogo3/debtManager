from rest_framework import serializers
from django.contrib.auth.models import User
from django.db import transaction
from django.db.models import Sum
from .models import Debt,Debtor,History,DebtPayment
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ["first_name","last_name","username","email","password"]

    def validate(self, data):
        password = data['password']

        if len(password) <= 5:
            raise serializers.ValidationError({'message':'Password must be more than 5 characters long'})

        return data

    def create(self, validated_data):
        if User.objects.filter(email = validated_data['email']).exists():
            raise serializers.ValidationError({"username":"A user with this email already exists"})
        user = User(
            first_name = validated_data["first_name"],
            last_name = validated_data["last_name"],
            username = validated_data["username"],
            email = validated_data["email"])
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class AddDebtorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Debtor
        fields = ['fullname','phone']

    def validate(self, data):
        phone = data['phone']
        if len(phone) <= 10: 
            raise serializers.ValidationError({'message':'Phone must be more than 10 characters long'})
        return data
    

    def create(self, validated_data):
        creditor = self.context['request'].user
        phone = validated_data['phone']
        if Debtor.objects.filter(phone = phone, creditor = creditor).exists():
            raise serializers.ValidationError({'message':'Debtor already exists'})
        
        debtor = Debtor(
            fullname = validated_data['fullname'],
            phone = phone,
            creditor = creditor
        )
        debtor.save()
        return debtor
    
class PayDebtSerializer(serializers.ModelSerializer):
    class Meta:
        model = DebtPayment
        fields = ["amount_paid","debt",]

    def validate(self, data):
        creditor = self.context['request'].user
        amount_paid = data['amount_paid']

        try:
           debt = Debt.objects.get(id=data['debt'].id)
        except Debt.DoesNotExist:
                raise serializers.ValidationError({'message':'Debt not found'})
        
        if debt.amount - debt.paid < data['amount_paid']:
            raise serializers.ValidationError({'message':"Payment exceeds remaining debt amount"})
        
        if debt.creditor != creditor:
            raise serializers.ValidationError({'message':'You are not allowed to pay this debt'})
        
        if amount_paid < 1 :
            raise serializers.ValidationError({'message':'Payment cannot be less than 1'})
        
        data['debt'] = debt
        
        return data

    def create(self, validated_data):
        creditor = self.context['request'].user
        debtor = validated_data['debt'].debtor
        debt = validated_data['debt']
        amount_paid = validated_data['amount_paid']

        with transaction.atomic():

            debt.paid += amount_paid
            if debt.paid >= debt.amount:
                debt.is_paid = True
            
            debt.save()

            debt_amount = Debt.objects.filter(creditor=creditor,debtor=debtor).aggregate(total=Sum('amount'))['total'] or 0
            paid_amount = Debt.objects.filter(creditor=creditor,debtor=debtor).aggregate(total=Sum('paid'))['total'] or 0
            total_balance = debt_amount - paid_amount

            History.objects.create(
                creditor=creditor,
                debtor=debtor,
                debt=debt,
                is_payment=True,
                amount=amount_paid,
                balance=total_balance
            )
            return debt
        




class DebtorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Debtor
        fields = '__all__'


class DebtSerializer(serializers.ModelSerializer):
    # debtor = DebtorSerializer(Debtor,read_only=True)
    class Meta:
        model = Debt
        fields = '__all__'

class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = '__all__'

class AddDebtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Debt
        fields = ['debtor', 'amount', 'desc']

    def validate(self, data):
        if data['amount'] < 1 :
            raise serializers.ValidationError({'message':'Amount should be more than 0'})
        return data

    def create(self, validated_data):
        with transaction.atomic():
            creditor = self.context['request'].user
            debtor = validated_data['debtor']
            amount = validated_data['amount']
            desc = validated_data.get('desc', '')

            if not Debtor.objects.filter(creditor=creditor, id=debtor.id).exists():
                raise serializers.ValidationError({"message": "Debtor does not exist for this creditor"})

            debt = Debt.objects.create(creditor=creditor, **validated_data)

            total_debt = Debt.objects.filter(creditor=creditor, debtor=debtor).aggregate(total=Sum('amount'))['total'] or 0
            total_paid = Debt.objects.filter(creditor=creditor, debtor=debtor).aggregate(total=Sum('paid'))['total'] or 0
            total_balance = total_debt - total_paid

            History.objects.create(
                creditor=creditor,
                debtor=debtor,
                debt=debt,
                is_payment=False,
                amount=amount,
                balance=total_balance
            )

            return debt
        
class DeleteDebtorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Debtor
        fields = ['phone']
    
    def validate(self, data):
        creditor = self.context['request'].user
        debtor_phone = data.get('phone')

        if not debtor_phone:
            raise serializers.ValidationError({'message': "Debtor phone is required"})

        try:
            debtor = Debtor.objects.get(phone = debtor_phone, creditor=creditor)
        except Debtor.DoesNotExist:
            raise serializers.ValidationError({'message': "Debtor does not exist"})

        if debtor.creditor != creditor:
            raise serializers.ValidationError({'message': "You don't have permission to delete this debtor"})

        # Store for use in create()
        self.debtor_instance = debtor

        return data
    
    def create(self, validated_data):
        self.debtor_instance.delete()
        return {'message': 'Debtor deleted successfully'}

            