import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TotalExpenses from './TotalExpenses';
import api from './Api'; // Подключаем наш файл с настройками API

const MainPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn); // Проверяем значение isLoggedIn
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsername(storedUser);
      setIsLoggedIn(true);
    }

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }

    // Получаем траты текущего пользователя
    if (isLoggedIn) {
      api.get('expenses/')
        .then(response => {
          console.log('Expenses response:', response.data); // Проверяем данные трат
          setExpenses(response.data);
        })
        .catch(error => console.error('Ошибка при получении всех трат:', error));
    }

    // Получаем все категории
    api.get('expense-categories/')
      .then(response => {
        console.log('Categories response:', response.data); // Проверяем данные категорий
        setCategories(response.data);
      })
      .catch(error => console.error('Ошибка при получении всех категорий:', error));
  }, [isLoggedIn, successMessage]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username: username,
        password: password
      });
      console.log('Login successful:', response.data);
      setIsLoggedIn(true);
      localStorage.setItem('user', username);
      localStorage.setItem('token', response.data.access);
      setToken(response.data.access);
      setLoginError('');
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('Ошибка при входе. Пожалуйста, проверьте логин и пароль.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setToken('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      alert('Для добавления новой траты войдите в систему');
      return;
    }
    try {
      console.log('Submitting expense data:', {
        category: selectedCategory,
        amount: amount,
        description: description
      });

      const response = await api.post('create-expense/', {
        category: selectedCategory,
        amount: amount,
        description: description
      });

      console.log('Expense created successfully:', response.data);
      setSuccessMessage('Трата успешно добавлена');
      setSelectedCategory('');
      setAmount('');
      setDescription('');
    } catch (error) {
      console.error('Error creating expense:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${day}.${month}.${year}`;
  };

  return (
    <div>
      {successMessage && <p>{successMessage}</p>}
      {isLoggedIn ? (
        <div>
          <h2>Вы успешно вошли, {username}!</h2>
          <button onClick={handleLogout}>Выйти</button>
        </div>
      ) : (
        <div>
          <h2>Вход в систему</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">Логин:</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password">Пароль:</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Войти</button>
            {loginError && <p>{loginError}</p>}
          </form>
          <Link to="/registration">Регистрация</Link>
        </div>
      )}

      <h2>Траты за месяц</h2>
      <Link to="/categories">Список категорий</Link>
      <TotalExpenses expenses={expenses} />
      <h2>Добавить новую трату</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Категория:</label>
          <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Выберите категорию</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="amount">Сумма:</label>
          <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div>
          <label htmlFor="description">Описание:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">Добавить</button>
      </form>

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

export default MainPage;
