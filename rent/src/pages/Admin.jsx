import { useEffect, useState } from 'react';
import { getAllUsers } from '../services/userService';
import { getAllRentals } from '../services/rentalService';
import { autoExtendRentals } from '../services/rentalService';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getAllUsers();
      const rentalData = await getAllRentals();
      setUsers(userData);
      setRentals(rentalData);
    };
    fetchData();
  }, []);

  const handleAutoExtend = async () => {
    try {
      await autoExtendRentals();
      alert('Аренды успешно продлены');
      // Обновить список аренд
      const rentalData = await getAllRentals();
      setRentals(rentalData);
    } catch (err) {
      alert('Ошибка продления аренды');
    }
  };

  return (
    <div>
      <h1>Панель администратора</h1>
      <h2>Пользователи</h2>
      {users.map((user) => (
        <div key={user.user_id}>
          <p>{user.name} ({user.email})</p>
        </div>
      ))}
      <h2>Аренды</h2>
      {rentals.map((rental) => (
        <div key={rental.rental_id}>
          <p>Товар ID: {rental.product_id}</p>
          <p>Пользователь ID: {rental.user_id}</p>
          <p>Дата окончания: {new Date(rental.rental_end).toLocaleDateString()}</p>
          <p>Статус: {rental.status}</p>
        </div>
      ))}
      <button onClick={handleAutoExtend}>Продлить аренды</button>
    </div>
  );
};

export default Admin;
