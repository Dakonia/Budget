// Logout.jsx
import React from 'react';

const Logout = ({ username, onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem('user'); // Удаляем пользователя из хранилища
    localStorage.removeItem('token'); // Удаляем access token из хранилища
    localStorage.removeItem('refreshToken'); // Удаляем refresh token из хранилища
    onLogout(); // Вызываем функцию обработчика выхода пользователя
    window.location.reload(); // Обновляем страницу
  };

  return (
    <div>
      <h2>{`Вы успешно вошли, ${username}!`}</h2>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}

export default Logout;
