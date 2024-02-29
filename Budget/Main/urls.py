from django.urls import path
from .views import *

urlpatterns = [
    path('api/expenses/', ExpenseListCreateAPIView.as_view(), name='expense-list-create'),
    path('api/incomes/', IncomeListCreateAPIView.as_view(), name='income-list-create'),
    path('api/expense-categories/', ExpenseCategoryListCreateAPIView.as_view(), name='expense-category-list-create'),
    path('api/income-categories/', IncomeCategoryListCreateAPIView.as_view(), name='income-category-list-create'),
]
