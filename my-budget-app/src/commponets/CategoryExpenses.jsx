// CategoryExpenses.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CategoryExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const { categoryId } = useParams();


  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/expenses/?category=${categoryId}`)
      .then(response => {
        setExpenses(response.data);
        const total = response.data.reduce((acc, cur) => acc + parseFloat(cur.amount), 0);
        setTotalExpense(total);
      })
      .catch(error => console.error('Ошибка при получении трат по категории:', error));
  }, [categoryId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${day}.${month}.${year}`;
  };

  return (
    <div>
      <h2>Траты по выбранной категории</h2>
      <div>Общая сумма трат: {totalExpense}</div>
      <table>
        <thead>
          <tr>
            <th>Время</th>
            <th>Название</th>
            <th>Сумма</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td>{formatDate(expense.created_at)}</td>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryExpenses;
