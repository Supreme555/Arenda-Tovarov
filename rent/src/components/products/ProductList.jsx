import { useEffect, useState } from 'react';
import { getAvailableProducts } from '../../services/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAvailableProducts();
        setProducts(data);
      } catch (err) {
        console.error('Ошибка загрузки продуктов:', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product.product_id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price_per_day} KZT/день</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
