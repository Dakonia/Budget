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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchClicked, setSearchClicked] = useState(false); 
  const [currentMonth, setCurrentMonth] = useState('');
  const [totalExpensesCount, setTotalExpensesCount] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsername(storedUser);
      setIsLoggedIn(true);
    }

    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    setStartDate(firstDayOfMonth.toISOString().split('T')[0]);
    setEndDate(lastDayOfMonth.toISOString().split('T')[0]);
    setCurrentMonth(getCurrentMonthName());
    setSelectedMonth(currentDate.getMonth() + 1);
    setSelectedYear(currentDate.getFullYear());

    fetchExpenses(firstDayOfMonth.toISOString().split('T')[0], lastDayOfMonth.toISOString().split('T')[0]);
    
    api.get('expense-categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении всех категорий:', error);
      });

    const intervalId = setInterval(() => {
      const currentMonthName = getCurrentMonthName();
      if (currentMonth !== currentMonthName) {
        setCurrentMonth(currentMonthName);
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        setStartDate(firstDayOfMonth.toISOString().split('T')[0]);
        setEndDate(lastDayOfMonth.toISOString().split('T')[0]);
        fetchExpenses(firstDayOfMonth.toISOString().split('T')[0], lastDayOfMonth.toISOString().split('T')[0]);
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, [currentMonth]);

  useEffect(() => {
    if (searchClicked) {
      fetchExpenses(startDate, endDate);
    }
  }, [searchClicked]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleAddExpenseSuccess = () => {
    setSearchClicked(false);
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    fetchExpenses(firstDayOfMonth.toISOString().split('T')[0], lastDayOfMonth.toISOString().split('T')[0]);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleSearch = () => {
    setSearchClicked(true);
  };

  const fetchExpenses = async (start, end) => {
    try {
      const response = await api.get('expenses/', {
        params: { start_date: start, end_date: end }
      });
      setExpenses(response.data);
      setTotalExpensesCount(response.data.length);
    } catch (error) {
      console.error('Ошибка при получении всех трат:', error);
    }
  };

  const getCurrentMonthName = (date) => {
    const currentDate = date || new Date();
    return currentDate.toLocaleString('default', { month: 'long' });
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleFilterByMonthYear = () => {
    if (selectedMonth && selectedYear) {
      const selectedStartDate = new Date(selectedYear, selectedMonth - 1, 1);
      const selectedEndDate = new Date(selectedYear, selectedMonth, 0);
      setStartDate(selectedStartDate.toISOString().split('T')[0]);
      setEndDate(selectedEndDate.toISOString().split('T')[0]);
      fetchExpenses(selectedStartDate.toISOString().split('T')[0], selectedEndDate.toISOString().split('T')[0]);
    }
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
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div>
          <select value={selectedMonth} onChange={handleMonthChange}>
            <option value="">Select Month</option>
            {Array.from({ length: 12 }, (_, index) => index + 1).map(month => (
              <option key={month} value={month}>{getCurrentMonthName(new Date(selectedYear, month - 1))}</option>
            ))}
          </select>
          <select value={selectedYear} onChange={handleYearChange}>
            <option value="">Select Year</option>
            {Array.from({ length: new Date().getFullYear() - 2023 }, (_, index) => 2024 + index).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <button onClick={handleFilterByMonthYear}>Filter</button>
        </div>
        <h3>{`Траты за ${getCurrentMonthName(new Date(selectedYear, selectedMonth - 1))} ${selectedYear}`}</h3>
        <p>{`Количество трат: ${totalExpensesCount}`}</p>
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

       
