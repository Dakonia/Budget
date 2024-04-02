// MainPage.jsx
import React, { useState, useEffect } from 'react';
import api from './Api';
import Header from './Header';
import AddExpenseForm from './AddExpenseForm';
import ExpenseList from './ExpenseList';
import MonthPicker from './MonthPicker';
import DateRangePicker from './DateRangePicker'; 

const MainPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // setUsername(storedUser);
      // setIsLoggedIn(true);
    }

    api.get('expense-categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении категорий:', error);
      });
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [currentDate, startDate, endDate]);

  const fetchExpenses = async () => {
    try {
      let startOfMonth, endOfMonth;
      if (startDate && endDate) {
        startOfMonth = startDate;
        endOfMonth = endDate;
      } else {
        startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      }

      const response = await api.get('expenses/', {
        params: {
          start_date: startOfMonth.toISOString().split('T')[0],
          end_date: endOfMonth.toISOString().split('T')[0]
        }
      });

      setExpenses(response.data);
    } catch (error) {
      console.error('Ошибка при получении расходов:', error);
    }
  };

  const handleMonthChange = (month) => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), month - 1, prevDate.getDate()));
  };

  const handleYearChange = (year) => {
    setCurrentDate(prevDate => new Date(year, prevDate.getMonth(), prevDate.getDate()));
  };

  const handleDateRangeChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleRefresh = () => {
    setCurrentDate(new Date()); // Установка текущей даты
    setStartDate(new Date(currentDate.getFullYear(), currentDate.getMonth()+0, 2)); // Установка начала текущего месяца
    setEndDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 2)); // Установка конца текущего месяца
    fetchExpenses();
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
        <button onClick={handleRefresh}>Обновить</button> {/* Кнопка обновления страницы */}
        <DateRangePicker onDateRangeChange={handleDateRangeChange} />
        <AddExpenseForm categories={categories} handleRefresh={handleRefresh} /> {/* Передаем функцию обновления списка трат */}
        <ExpenseList expenses={expenses} categories={categories} currentDate={currentDate} startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
};

export default MainPage;
