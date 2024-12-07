import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Добро пожаловать в сервис аренды</h1>
        <p className="subtitle">Арендуйте необходимое оборудование быстро и удобно</p>
        
        {/* <div className="cta-buttons">
          {user ? (
            <Link to="/products" className="cta-button primary">
              Смотреть товары
            </Link>
          ) : (
            <>
              <Link to="/login" className="cta-button primary">
                Войти
              </Link>
              <Link to="/register" className="cta-button secondary">
                Регистрация
              </Link>
            </>
          )}
        </div> */}
      </div>

      <div className="features-section">
        <h2>Наши преимущества</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Быстрая доставка</h3>
            <p>Доставляем оборудование в день заказа</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Выгодные цены</h3>
            <p>Доступные тарифы и гибкие условия аренды</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Гарантия качества</h3>
            <p>Всё оборудование проходит проверку</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📞</div>
            <h3>Поддержка 24/7</h3>
            <p>Всегда готовы помочь и ответить на вопросы</p>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <h2>Как это работает</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Выберите товар</h3>
            <p>Просмотрите каталог доступного оборудования</p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>Оформите аренду</h3>
            <p>Укажите сроки и детали аренды</p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Получите товар</h3>
            <p>Заберите товар или закажите доставку</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
