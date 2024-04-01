from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/register/', UserCreateAPIView.as_view(), name='user-register'),
    path('api/expenses/', ExpenseListCreateAPIView.as_view(), name='expense-list-create'),
    path('api/incomes/', IncomeListCreateAPIView.as_view(), name='income-list-create'),
    path('api/expense-categories/', ExpenseCategoryListCreateAPIView.as_view(), name='expense-category-list-create'),
    path('api/income-categories/', IncomeCategoryListCreateAPIView.as_view(), name='income-category-list-create'),
    path('api/create-expense/', ExpenseCreateAPIView.as_view(), name='expense-create'),    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/expenses/category/<int:categoryId>/', ExpenseListCreateAPIView.as_view(), name='expense-list-by-category'),
    path('api/expense-categories/<int:pk>/', ExpenseCategoryDetailAPIView.as_view(), name='expense-category-detail'),
    path('api/expenses/<int:pk>/update/', ExpenseUpdateAPIView.as_view(), name='expense-update'),
    path('api/expenses/<int:pk>/delete/', ExpenseDeleteAPIView.as_view(), name='expense-delete'),
]
