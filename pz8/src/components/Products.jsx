import React, { useState } from 'react';

const Product = ({ title, price, img }) => {
  const [count, setCount] = useState(0);

  const handleBuy = () => {
    setCount(count + 1);
  };

  return (
    <div className="product">
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <p>Ціна: {price} грн</p>
      <button onClick={handleBuy}>Купити</button>
      <p>Куплено: {count}</p>
    </div>
  );
};

export default Product;
