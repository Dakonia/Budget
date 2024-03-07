// MainPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TotalExpenses from './TotalExpenses';
import api from './Api'; // Подключаем наш файл с настройками API
import Login from './Login';
import Logout from './Logout';
import AddExpenseForm from './AddExpenseForm';
import ExpenseList from './ExpenseList'; // Импортируем новый компонент

const MainPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn); // Проверяем значение isLoggedIn
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsername(storedUser);
      setIsLoggedIn(true);
    }

    // Получаем траты текущего пользователя
    if (isLoggedIn) {
      api.get('expenses/')
        .then(response => {
          console.log('Expenses response:', response.data); // Проверяем данные трат
          setExpenses(response.data);
        })
        .catch(error => console.error('Ошибка при получении всех трат:', error));
    }

    // Получаем все категории
    api.get('expense-categories/')
      .then(response => {
        console.log('Categories response:', response.data); // Проверяем данные категорий
        setCategories(response.data);
      })
      .catch(error => console.error('Ошибка при получении всех категорий:', error));
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleAddExpenseSuccess = () => {
    // Обновляем данные после успешного добавления траты
    api.get('expenses/')
      .then(response => {
        console.log('Expenses response:', response.data); // Проверяем данные трат
        setExpenses(response.data);
      })
      .catch(error => console.error('Ошибка при получении всех трат:', error));
  };

  return (
    <div>
      {isLoggedIn ? (
        <Logout username={username} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}

      <Link to="/categories">Список категорий</Link>
      <TotalExpenses expenses={expenses} />
      <AddExpenseForm categories={categories} onSuccess={handleAddExpenseSuccess} />

      <ExpenseList expenses={expenses} categories={categories} />
    </div>
  );
}

export default MainPage;
