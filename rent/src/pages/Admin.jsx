import { useEffect, useState } from 'react';
import { getAllUsers } from '../services/userService';
import { getAllRentals, autoExtendRentals, extendRental } from '../services/rentalService';
import { getAllProducts } from '../services/productService';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [extensionDays, setExtensionDays] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersData, rentalsData, productsData] = await Promise.all([
        getAllUsers(),
        getAllRentals(),
        getAllProducts()
      ]);
      setUsers(usersData);
      setRentals(rentalsData);
      setProducts(productsData);
    } catch (err) {
      console.error('Ошибка загрузки данных:', err);
    }
  };

  const handleAutoExtend = async () => {
    try {
      await autoExtendRentals(extensionDays);
      alert(`Аренды успешно продлены на ${extensionDays} ${extensionDays === 1 ? 'день' : 'дней'}`);
      fetchData();
    } catch (err) {
      alert('Ошибка при продлении аренд');
    }
  };

  const handleExtendRental = async (rentalId) => {
    try {
      await extendRental(rentalId, extensionDays);
      alert(`Аренда успешно продлена на ${extensionDays} ${extensionDays === 1 ? 'день' : 'дней'}`);
      fetchData();
    } catch (err) {
      alert('Ошибка при продлении аренды');
    }
  };

  return (
    <div className="admin-panel">
      <h1>Панель администратора</h1>
      
      <div className="admin-tabs">
        <button 
          className={activeTab === 'users' ? 'active' : ''} 
          onClick={() => setActiveTab('users')}
        >
          Пользователи
        </button>
        <button 
          className={activeTab === 'rentals' ? 'active' : ''} 
          onClick={() => setActiveTab('rentals')}
        >
          Аренды
        </button>
        <button 
          className={activeTab === 'products' ? 'active' : ''} 
          onClick={() => setActiveTab('products')}
        >
          Товары
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="users-section">
          <h2>Пользователи</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Email</th>
                <th>Дата регистрации</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'rentals' && (
        <div className="rentals-section">
          <h2>Аренды</h2>
          <div className="rentals-controls">
            <div className="extension-controls">
              <input
                type="number"
                min="1"
                value={extensionDays}
                onChange={(e) => setExtensionDays(Number(e.target.value))}
                className="days-input"
              />
              <button onClick={handleAutoExtend} className="extend-button">
                Продлить все активные аренды
              </button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Пользователь</th>
                <th>Email</th>
                <th>Товар</th>
                <th>Цена/день</th>
                <th>Начало</th>
                <th>Окончание</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map(rental => (
                <tr key={rental.rental_id}>
                  <td>{rental.rental_id}</td>
                  <td>{rental.User?.name || 'Н/Д'}</td>
                  <td>{rental.User?.email || 'Н/Д'}</td>
                  <td>{rental.Product?.name || 'Н/Д'}</td>
                  <td>{rental.Product?.price_per_day || 0} KZT</td>
                  <td>{new Date(rental.rental_start).toLocaleDateString()}</td>
                  <td>{new Date(rental.rental_end).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${rental.status}`}>
                      {rental.status}
                    </span>
                  </td>
                  <td>
                    {rental.status === 'active' && (
                      <button
                        onClick={() => handleExtendRental(rental.rental_id)}
                        className="extend-single-button"
                      >
                        Продлить
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="products-section">
          <h2>Товары</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Описание</th>
                <th>Цена/день</th>
                <th>Количество</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.product_id}>
                  <td>{product.product_id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price_per_day}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
