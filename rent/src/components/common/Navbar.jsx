import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Rental Service</Link>
      </div>
      <div className="nav-links">
        <Link to="/products">Товары</Link>
        {user ? (
          <>
            <Link to="/rentals">Мои аренды</Link>
            {user.role === 'admin' && (
              <Link to="/admin">Админ панель</Link>
            )}
            <span className="user-info">
              {user.name}
            </span>
            <button onClick={logout} className="logout-button">
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Войти</Link>
            <Link to="/register">Регистрация</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
