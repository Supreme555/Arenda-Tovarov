import { useEffect, useState } from 'react';
import { getUserRentals, returnProduct } from '../services/rentalService';

const Rentals = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      const data = await getUserRentals(1); // Замените на ID текущего пользователя
      setRentals(data);
    };
    fetchRentals();
  }, []);

  const handleReturn = async (rentalId) => {
    try {
      await returnProduct(rentalId);
      alert('Товар успешно возвращен');
      const data = await getUserRentals(1);
      setRentals(data);
    } catch (err) {
      alert('Ошибка при возврате');
    }
  };

  return (
    <div>
      <h1>Мои аренды</h1>
      {rentals.map((rental) => (
        <div key={rental.rental_id}>
          <p>Товар: {rental.product_id}</p>
          <p>Дата начала: {new Date(rental.rental_start).toLocaleDateString()}</p>
          <p>Дата окончания: {new Date(rental.rental_end).toLocaleDateString()}</p>
          <p>Статус: {rental.status}</p>
          {rental.status === 'active' && (
            <button onClick={() => handleReturn(rental.rental_id)}>Вернуть</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Rentals;
