import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      const { confirmPassword, ...registrationData } = form;
      await register(registrationData);
      alert('Регистрация успешна! Теперь вы можете войти.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при регистрации');
      console.error('Ошибка регистрации:', err);
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit} className="register-form">
        <h1>Регистрация</h1>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="name">Имя</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Подтвердите пароль</label>
          <input
            id="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            required
          />
        </div>

        <button type="submit">Зарегистрироваться</button>
        
        <div className="form-footer">
          Уже есть аккаунт? <a href="/login">Войти</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
