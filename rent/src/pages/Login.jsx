import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const response = await login(form);
      localStorage.setItem('token', response.token);
      authLogin(response.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при входе в систему');
      console.error('Ошибка входа:', err);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Войти</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Пароль"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <button type="submit">Войти</button>
        <div className="form-footer">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
