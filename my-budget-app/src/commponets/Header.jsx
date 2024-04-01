// Header.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import '../styles/Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsername(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('user');
  };

  return (
    <header className="header">
      <Link to="/categories" className='category'>Категорий</Link>

      <Link to="/" className="logo">Бюджет</Link>
      <div className="actions">
        {isLoggedIn ? (
          <Logout username={username} onLogout={handleLogout} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </header>
  );
}

export default Header;
