import React from 'react';

const ProductCard = ({ product, onRent }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p className="description">{product.description}</p>
      <div className="details">
        <p className="price">{product.price_per_day} KZT/день</p>
        <p className="quantity">В наличии: {product.quantity}</p>
      </div>
      <button 
        onClick={() => onRent(product.product_id)}
        className="rent-button"
      >
        Арендовать
      </button>
    </div>
  );
};

export default ProductCard;
