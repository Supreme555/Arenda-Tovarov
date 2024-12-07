import { useEffect, useState } from 'react';
import { getUserRentals, returnProduct } from '../services/rentalService';
import { useAuth } from '../context/AuthContext';

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setLoading(true);
        const data = await getUserRentals(user.id);
        setRentals(data);
      } catch (err) {
        setError('Ошибка при загрузке аренд');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRentals();
    }
  }, [user]);

  const handleReturn = async (rentalId) => {
    try {
      await returnProduct(rentalId);
      alert('Товар успешно возвращен');
      const data = await getUserRentals(user.id);
      setRentals(data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Ошибка при возврате товара';
      alert(errorMessage);
      console.error('Ошибка при возврате:', err);
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="rentals-page">
      <h1>Мои аренды</h1>
      <div className="rentals-list">
        {rentals.map((rental) => (
          <div key={rental.rental_id} className="rental-card">
            <h3>Товар: {rental.Product?.name || rental.product_id}</h3>
            <p>Начало: {new Date(rental.rental_start).toLocaleDateString()}</p>
            <p>Окончание: {new Date(rental.rental_end).toLocaleDateString()}</p>
            <p>Статус: {rental.status}</p>
            {rental.status === 'active' && (
              <button 
                onClick={() => handleReturn(rental.rental_id)}
                className="return-button"
              >
                Вернуть
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rentals;
