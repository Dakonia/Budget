import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from './Api';
import TotalExpensesForCategory from './TotalExpensesForCategory';

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

  useEffect(() => {
    console.log('Текущая категория:', categoryId);
        // Добавляем токен авторизации к заголовкам axios
        api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

        // Получаем идентификатор пользователя из локального хранилища
        const userId = localStorage.getItem('user');
    
        // Проверяем, что userId не пустой
        if (userId) {
          api.get(`expenses/category/${categoryId}/`, { params: {} })
            .then(response => {
              console.log('Ответ на запрос трат:', response.data);
              setExpenses(response.data);
            })
            .catch(error => console.error('Ошибка при получении трат:', error));
        }
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
              <td>{formatDate(expense.created_at)}</td>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Итого за месяц:</th>
            <th colSpan="2">
              <TotalExpensesForCategory expenses={expenses} />
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpenseTable;
