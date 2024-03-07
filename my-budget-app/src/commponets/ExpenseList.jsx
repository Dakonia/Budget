// ExpenseList.jsx
import React from 'react';
import '../styles/ExpenseList.css';
import TotalExpenses from './TotalExpenses';

const ExpenseList = ({ expenses, categories }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${day}.${month}.${year}`;
  };

  return (
    <div>
      <h2 className="expense-list-title">Все траты за месяц</h2>
      <TotalExpenses expenses={expenses} />
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
          {expenses.map(expense => (
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
