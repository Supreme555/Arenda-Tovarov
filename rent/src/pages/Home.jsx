import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Добро пожаловать в систему аренды!</h1>
      <nav>
        <Link to="/products">Товары</Link> | <Link to="/login">Войти</Link>
      </nav>
    </div>
  );
};

export default Home;
