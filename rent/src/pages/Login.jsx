import React, { useState } from 'react';
import { login } from '../services/authService';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(form);
      alert('Вход выполнен!');
      console.log(response);
    } catch (err) {
      alert('Ошибка входа: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Войти</h1>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Войти</button>
    </form>
  );
};

export default Login;
