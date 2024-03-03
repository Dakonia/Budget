from rest_framework import generics
from .models import Expense, Income, IncomeCategory, ExpenseCategory
from .serializers import *
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError

class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Разрешаем доступ для всех пользователей


class ExpenseListCreateAPIView(generics.ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        # Получаем параметр категории из запроса
        category_id = self.request.query_params.get('category', None)
        
        # Если категория передана, фильтруем траты по этой категории
        if category_id is not None:
            return Expense.objects.filter(category_id=category_id)
        
        # В противном случае, возвращаем все траты
        return Expense.objects.all()

class IncomeListCreateAPIView(generics.ListCreateAPIView):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer

class ExpenseCategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = ExpenseCategory.objects.all()
    serializer_class = ExpenseCategorySerializer

class IncomeCategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = IncomeCategory.objects.all()
    serializer_class = IncomeCategorySerializer

from rest_framework import generics
from .models import Expense, Income, IncomeCategory, ExpenseCategory
from .serializers import *
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User

class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Разрешаем доступ для всех пользователей


class ExpenseListCreateAPIView(generics.ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        # Получаем параметр категории из запроса
        category_id = self.request.query_params.get('category', None)
        
        # Если категория передана, фильтруем траты по этой категории
        if category_id is not None:
            return Expense.objects.filter(category_id=category_id)
        
        # В противном случае, возвращаем все траты
        return Expense.objects.all()

class IncomeListCreateAPIView(generics.ListCreateAPIView):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer

class ExpenseCategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = ExpenseCategory.objects.all()
    serializer_class = ExpenseCategorySerializer

class IncomeCategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = IncomeCategory.objects.all()
    serializer_class = IncomeCategorySerializer

from rest_framework import status
from rest_framework.response import Response

class ExpenseCreateAPIView(generics.CreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        # Проверяем, авторизован ли пользователь
        if not request.user.is_authenticated:
            return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Заполняем поле user текущим пользователем
        request.data['user'] = request.user.id
        
        # Создаем объект расхода с помощью метода create родительского класса
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
