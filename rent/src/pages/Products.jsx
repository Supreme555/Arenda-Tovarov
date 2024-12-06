import { useEffect, useState } from 'react';
import { getAvailableProducts } from '../services/productService';
import { rentProduct } from '../services/rentalService';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAvailableProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleRent = async (productId) => {
    const rentalDetails = {
      user_id: 1, // Замените на ID текущего пользователя из контекста
      product_id: productId,
      rental_start: new Date().toISOString(),
      rental_end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // +7 дней
    };
    try {
      await rentProduct(rentalDetails);
      alert('Товар успешно арендован');
      // Обновляем список
      const data = await getAvailableProducts();
      setProducts(data);
    } catch (err) {
      alert('Ошибка при аренде');
    }
  };

  return (
    <div>
      <h1>Доступные товары</h1>
      {products.map((product) => (
        <div key={product.product_id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Цена: {product.price_per_day} KZT/день</p>
          <button onClick={() => handleRent(product.product_id)}>Арендовать</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
