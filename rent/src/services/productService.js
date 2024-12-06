import api from './api';

// Получение всех доступных товаров
export const getAvailableProducts = async () => {
  const { data } = await api.get('/products/available');
  return data;
};

// Получение всех товаров (для администратора)
export const getAllProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};
