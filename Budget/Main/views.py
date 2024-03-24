from rest_framework import generics
from .models import Expense, Income, IncomeCategory, ExpenseCategory
from .serializers import *
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from .pagination import CustomPageNumberPagination

class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Разрешаем доступ для всех пользователей

class ExpenseListCreateAPIView(generics.ListCreateAPIView):
    queryset = Expense.objects.all().order_by('-created_at')  # Обратная сортировка по времени создания
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        category_id = self.kwargs.get('categoryId')  # Получаем categoryId из URL
        if category_id:
            return Expense.objects.filter(user=user, category_id=category_id).order_by('-created_at')
        else:
            return Expense.objects.filter(user=user).order_by('-created_at')


class IncomeListCreateAPIView(generics.ListCreateAPIView):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer

class ExpenseCategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = ExpenseCategory.objects.all()
    serializer_class = ExpenseCategorySerializer

class IncomeCategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = IncomeCategory.objects.all()
    serializer_class = IncomeCategorySerializer


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
