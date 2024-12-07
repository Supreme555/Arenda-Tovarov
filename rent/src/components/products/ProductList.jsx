import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onRent }) => {
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard 
          key={product.product_id} 
          product={product} 
          onRent={onRent}
        />
      ))}
    </div>
  );
};

export default ProductList;
