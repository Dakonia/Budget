// ExpenseList.jsx

import React, { useState, useEffect } from 'react';
import '../styles/ExpenseList.css';
import TotalExpenses from './TotalExpenses';

const ExpenseList = ({ expenses, categories, currentPage, perPage }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    calculateTotalExpenses();
  }, [expenses]); // Обновляем сумму трат при изменении списка трата

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${day}.${month}.${year}`;
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;
  const currentExpenses = expenses.slice(startIndex, endIndex);

  const calculateTotalExpenses = () => {
    let total = 0;
    currentExpenses.forEach(expense => {
      total += parseFloat(expense.amount);
    });
    setTotalExpenses(total.toFixed(2));
  };

  return (
    <div>
      <h2 className="expense-list-title">Все траты за месяц</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Категория</th>
            <th>Сумма</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {currentExpenses.map(expense => (
            <tr key={expense.id}>
              <td>{formatDate(expense.created_at)}</td>
              <td>{categories.find(cat => cat.id === expense.category)?.name}</td>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
