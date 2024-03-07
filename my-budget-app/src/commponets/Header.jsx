// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import '../styles/Header.css'

const Header = ({ isLoggedIn, username, onLogin, onLogout }) => {
  return (
    <header className="header">
      <Link to="/categories" className='category'>Категорий</Link>

      <Link to="/" className="logo">Бюджет</Link>
      <div className="actions">
        {isLoggedIn ? (
          <Logout username={username} onLogout={onLogout} />
        ) : (
          <Login onLogin={onLogin} />
        )}
      </div>
    </header>
  );
}

export default Header;
