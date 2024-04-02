import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from './Api';
import TotalExpensesForCategory from './TotalExpensesForCategory';
import Header from './Header';
import DateRangePicker from './DateRangePicker';
import MonthPicker from './MonthPicker';
import '../styles/ExpenseList.css';
import '../styles/MainPage.css'

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${day}.${month}.${year}`;
};

const ExpenseTable = () => {
  const { categoryId } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    console.log('Текущая категория:', categoryId);
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    const userId = localStorage.getItem('user');

    if (userId) {
      api.get(`expenses/category/${categoryId}/`, { params: {} })
        .then(response => {
          console.log('Ответ на запрос трат:', response.data);
          setExpenses(response.data);
        })
        .catch(error => console.error('Ошибка при получении трат:', error));
    }
  }, [categoryId]);

  useEffect(() => {
    fetchExpenses();
  }, [currentDate, startDate, endDate]);

  const fetchExpenses = async () => {
    try {
      let start, end;
      if (startDate && endDate) {
        start = startDate;
        end = endDate;
      } else {
        start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      }

      const response = await api.get('expenses/', {
        params: {
          start_date: start.toISOString().split('T')[0],
          end_date: end.toISOString().split('T')[0]
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
    setCurrentDate(new Date());
    setStartDate(null);
    setEndDate(null);
    fetchExpenses();
  };

  return (
    <div>
      <Header />
      <MonthPicker selectedMonth={currentDate.getMonth() + 1} selectedYear={currentDate.getFullYear()} onMonthChange={handleMonthChange} onYearChange={handleYearChange} />
      <button className="refresh-button" onClick={handleRefresh}>Обновить</button>
      <DateRangePicker onDateRangeChange={handleDateRangeChange} />
      <h2>Траты по выбранной категории</h2>
      <TotalExpensesForCategory expenses={expenses} />
      <table className="table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Сумма</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td>{formatDate(expense.created_at)}</td>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="2"></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpenseTable;
