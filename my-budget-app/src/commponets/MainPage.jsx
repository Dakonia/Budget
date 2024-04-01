import React, { useState, useEffect } from 'react';
import api from './Api';
import Header from './Header';
import AddExpenseForm from './AddExpenseForm';
import ExpenseList from './ExpenseList';
import MonthPicker from './MonthPicker'; // Импортируем MonthPicker
import '../styles/MainPage.css';

const MainPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date()); // Текущая дата

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsername(storedUser);
      setIsLoggedIn(true);
    }

    api.get('expense-categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении категорий:', error);
      });
  }, []);

  const handleMonthChange = (month) => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), month - 1, prevDate.getDate()));
  };

  const handleYearChange = (year) => {
    setCurrentDate(prevDate => new Date(year, prevDate.getMonth(), prevDate.getDate()));
  };

  return (
    <div>
      <Header />
      <div className="content">
        <MonthPicker
          selectedMonth={currentDate.getMonth() + 1}
          selectedYear={currentDate.getFullYear()}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
        />
        <AddExpenseForm categories={categories} onSuccess={() => {}} />
        <ExpenseList expenses={expenses} categories={categories} currentDate={currentDate} />
      </div>
    </div>
  );
};

export default MainPage;
