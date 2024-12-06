import api from './api';

// Аренда товара
export const rentProduct = async (rentalDetails) => {
  const { data } = await api.post('/rentals/rent', rentalDetails);
  return data;
};

// Возврат товара
export const returnProduct = async (rentalId) => {
  const { data } = await api.post('/rentals/return', { rental_id: rentalId });
  return data;
};

// Автоматическое продление аренды
export const autoExtendRentals = async () => {
  const { data } = await api.post('/rentals/auto-extend');
  return data;
};

// Получение всех арендованных товаров пользователя
export const getUserRentals = async (userId) => {
  const { data } = await api.get(`/rentals/user/${userId}`);
  return data;
};

// Получение всех аренд (для администратора)
export const getAllRentals = async () => {
  const { data } = await api.get('/rentals');
  return data;
};


