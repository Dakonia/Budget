import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Используем useNavigate вместо useHistory

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Используем useNavigate для перенаправления

  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      console.log('Отправка данных регистрации:', { username, password });
      const response = await axios.post('http://localhost:8000/api/register/', {
        username: username,
        password: password
      });
      console.log('Регистрация успешна:', response.data);
      navigate('/'); // Используем navigate для перенаправления на главную страницу
    } catch (error) {
      console.error('Ошибка во время регистрации:', error);
      if (error.response.status === 400) {
        setError('Это имя пользователя уже занято. Пожалуйста, выберите другое имя пользователя.');
      } else {
        setError('Произошла ошибка во время регистрации. Пожалуйста, попробуйте снова.');
      }
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleRegistration}>
        <div>
          <label htmlFor="username">Имя пользователя:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegistrationForm;