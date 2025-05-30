import { useState } from "react";

function Product({ title, price, img, onBuy }) {
  const [count, setCount] = useState(0);

  const handleBuy = () => {
    setCount((prev) => prev + 1);
    onBuy(); // повідомляємо App
  };

  return (
    <div className="product">
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <p>Ціна: {price} грн</p>
      <p>Куплено: {count}</p>
      <button onClick={handleBuy}>Купити</button>
    </div>
  );
}

export default Product;
