import api from './api';

export const login = async (credentials) => {
  try {
    const { data } = await api.post('/users/login', credentials);
    return data;
  } catch (error) {
    console.error('Ошибка при входе:', error.response?.data || error.message);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const { data } = await api.post('/users/register', userData);
    return data;
  } catch (error) {
    console.error('Ошибка при регистрации:', error.response?.data || error.message);
    throw error;
  }
};
