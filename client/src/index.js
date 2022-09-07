import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { CartProvider } from './components/Context/CartContext';
import { CheckoutProvider } from './components/Context/CheckoutContext';

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <CheckoutProvider>
        <App />
      </CheckoutProvider>
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
