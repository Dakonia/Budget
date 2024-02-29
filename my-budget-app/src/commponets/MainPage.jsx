// MainPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TotalExpenses from './TotalExpenses';

const MainPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/expenses/')
      .then(response => setExpenses(response.data))
      .catch(error => console.error('Ошибка при получении всех трат:', error));

    axios.get('http://127.0.0.1:8000/api/expense-categories/')
      .then(response => {
        const categoryMap = {};
        response.data.forEach(category => {
          categoryMap[category.id] = category.name;
        });
        setCategories(categoryMap);
      })
      .catch(error => console.error('Ошибка при получении всех категорий:', error));
  }, []);

  // Функция для форматирования даты
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${day}.${month}.${year}`;
  };

  return (
    <div>
      <h2>Траты за месяц</h2>
      <Link to="/categories">Список категорий</Link>
      <TotalExpenses expenses={expenses} />
      <h2>Все траты за месяц</h2>
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Категория</th>
            <th>Сумма</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td>{formatDate(expense.created_at)}</td>
              <td>{categories[expense.category]}</td>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MainPage;
