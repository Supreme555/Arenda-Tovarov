import api from './api';

// Получение всех пользователей (для администратора)
export const getAllUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};
