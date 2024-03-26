// MainPage.jsx
import React, { useState, useEffect } from 'react';
import api from './Api';
import Header from './Header';
import AddExpenseForm from './AddExpenseForm';
import ExpenseList from './ExpenseList';
import ReactPaginate from 'react-paginate';
import '../styles/MainPage.css';
import TotalExpenses from './TotalExpenses'; 

const MainPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(15); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsername(storedUser);
      setIsLoggedIn(true);
    }

    if (isLoggedIn) {
      api.get('expenses/')
        .then(response => {
          setExpenses(response.data);
        })
        .catch(error => {
          console.error('Ошибка при получении всех трат:', error);
        });
    }

    api.get('expense-categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении всех категорий:', error);
      });
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleAddExpenseSuccess = () => {
    api.get('expenses/')
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении всех трат:', error);
      });
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div>
      <Header 
        isLoggedIn={isLoggedIn} 
        username={username} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      <div className="content">
        <TotalExpenses expenses={expenses} /> 
        <AddExpenseForm categories={categories} onSuccess={handleAddExpenseSuccess} />
        <ExpenseList expenses={expenses} categories={categories} currentPage={currentPage} perPage={perPage} />
        <ReactPaginate
          pageCount={Math.ceil(expenses.length / perPage)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={'pagination custom-cursor'} 
          activeClassName={'active'}
        />
      </div>
    </div>
  );
}

export default MainPage;

