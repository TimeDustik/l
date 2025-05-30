import { useState } from "react";
import "./App.css";
import Product from "./components/Product/Product";
import { products } from "./products";

function App() {
  const [totalCount, setTotalCount] = useState(0);

  const handleBuy = () => {
    setTotalCount((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Магазин</h1>
      <p>🛒 Загальна кількість покупок: {totalCount}</p>

      <div className="product-list">
        {products.map((p) => (
          <Product key={p.id} {...p} onBuy={handleBuy} />
        ))}
      </div>
    </div>
  );
}

export default App;
