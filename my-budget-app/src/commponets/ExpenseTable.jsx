// ExpenseTable.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ExpenseTable = () => {
  const { categoryId } = useParams();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/expenses/?category=${categoryId}`)
      .then(response => setExpenses(response.data))
      .catch(error => console.error('Ошибка при получении трат:', error));
  }, [categoryId]);

  return (
    <div>
      <h2>Траты по выбранной категории</h2>
      <table>
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
              <td>{expense.created_at}</td>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
