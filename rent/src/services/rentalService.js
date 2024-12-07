import api from './api';

// Аренда товара
export const rentProduct = async (rentalDetails) => {
  try {
    const { data } = await api.post('/rentals/rent', rentalDetails);
    return data;
  } catch (error) {
    console.error('Ошибка при аренде:', error.response?.data || error.message);
    throw error;
  }
};

// Возврат товара
export const returnProduct = async (rentalId) => {
  try {
    const { data } = await api.post('/rentals/return', { rental_id: rentalId });
    return data;
  } catch (error) {
    console.error('Ошибка при возврате:', error.response?.data || error.message);
    throw error;
  }
};

// Автоматическое продление аренды
export const autoExtendRentals = async (days) => {
  try {
    const { data } = await api.post('/rentals/auto-extend', { days });
    return data;
  } catch (error) {
    console.error('Ошибка при автопродлении аренд:', error.response?.data || error.message);
    throw error;
  }
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

// Продление аренды
export const extendRental = async (rentalId, days) => {
  try {
    const { data } = await api.post('/rentals/extend', { 
      rental_id: rentalId,
      days: days 
    });
    return data;
  } catch (error) {
    console.error('Ошибка при продлении аренды:', error.response?.data || error.message);
    throw error;
  }
};


