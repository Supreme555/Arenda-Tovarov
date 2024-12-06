import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Главная</Link> | <Link to="/products">Товары</Link> |{' '}
      <Link to="/rentals">Мои аренды</Link> | <Link to="/admin">Админка</Link>
    </nav>
  );
};

export default Navbar;
