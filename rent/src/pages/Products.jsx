import { useEffect, useState } from 'react';
import { getAvailableProducts } from '../services/productService';
import { rentProduct } from '../services/rentalService';
import ProductList from '../components/products/ProductList';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAvailableProducts();
      setProducts(data);
    } catch (err) {
      setError('Ошибка при загрузке продуктов');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRent = async (productId) => {
    try {
      const rentalDetails = {
        user_id: 1, // Замените на ID текущего пользователя из контекста
        product_id: productId,
        rental_start: new Date().toISOString(),
        rental_end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };
      await rentProduct(rentalDetails);
      alert('Товар успешно арендован');
      fetchProducts(); // Обновляем список после аренды
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Ошибка при аренде';
      alert(errorMessage);
      console.error('Ошибка при аренде:', err);
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="products-page">
      <h1>Доступные товары</h1>
      <ProductList products={products} onRent={handleRent} />
    </div>
  );
};

export default Products;
