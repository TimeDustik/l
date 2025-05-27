import React, { useState } from 'react';
import { products } from './products';
import Product from './components/Product';

const App = () => {
  return (
    <div>
      <h1>Магазин товарів</h1>
      <div className="product-list">
        {products.map(product => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default App;
