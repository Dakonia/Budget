from rest_framework import generics
from .models import Expense, Income, IncomeCategory, ExpenseCategory
from .serializers import *

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
