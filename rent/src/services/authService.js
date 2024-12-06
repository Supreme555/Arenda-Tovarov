import api from './api';

export const login = async (credentials) => {
  const { data } = await api.post('/users/login', credentials);
  return data;
};

export const register = async (userData) => {
  const { data } = await api.post('/users/register', userData);
  return data;
};
