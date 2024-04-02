// ExpenseList.jsx
import React, { useState, useEffect } from 'react';
import api from './Api';
import '../styles/ExpenseList.css';
import TotalExpenses from './TotalExpenses';
import EditExpenseForm from './EditExpenseForm'; 
import DeleteExpenseButton from './DeleteExpenseButton'; 
import ReactPaginate from 'react-paginate';
import '../styles/MainPage.css'

const ExpenseList = ({ currentDate, startDate, endDate }) => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(15);

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, [currentPage, perPage, currentDate, startDate, endDate]);

  const fetchExpenses = async () => {
    try {
      let startOfMonth, endOfMonth;
      if (startDate && endDate) {
        startOfMonth = startDate;
        endOfMonth = endDate;
      } else {
        startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() +0, 2);
        endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 2);
      }

      console.log('startOfMonth:', startOfMonth);
      console.log('endOfMonth:', endOfMonth);
      const response = await api.get('expenses/', {
        params: {
          start_date: startOfMonth.toISOString().split('T')[0],
          end_date: endOfMonth.toISOString().split('T')[0]
        }
      });
      console.log('start_date:', startOfMonth.toISOString().split('T')[0]);
      console.log('end_date:', endOfMonth.toISOString().split('T')[0]);

      setExpenses(response.data);
    } catch (error) {
      console.error('Ошибка при получении расходов:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('expense-categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Ошибка при получении категорий:', error);
    }
  };

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
  console.log(currentDate);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div>
      <TotalExpenses expenses={expenses} />
      <h2 className="expense-list-title">Все траты за месяц</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Категория</th>
            <th>Сумма</th>
            <th>Описание</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {currentExpenses.map(expense => (
            <tr key={expense.id}>
              <td>{formatDate(expense.created_at)}</td>
              <td>{categories.find(cat => cat.id === expense.category)?.name}</td>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
              <td>
                <EditExpenseForm expense={expense} categories={categories} onExpenseUpdated={fetchExpenses} />
                <DeleteExpenseButton expenseId={expense.id} onExpenseDeleted={fetchExpenses} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        pageCount={Math.ceil(expenses.length / perPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={'pagination custom-cursor'} 
        activeClassName={'active'}
      />
    </div>
  );
}

export default ExpenseList;
