// Logout.jsx
import React from 'react';

const Logout = ({ username, onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <div>
      <h2>{`Вы успешно вошли, ${username}!`}</h2>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}

export default Logout;