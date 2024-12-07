import api from './api';

// Получение всех пользователей (для администратора)
export const getAllUsers = async () => {
  try {
    const { data } = await api.get('/users');
    return data;
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    throw error;
  }
};
