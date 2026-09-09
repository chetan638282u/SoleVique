import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import Men from './src/pages/Men';
import { CurrencyProvider } from './src/context/CurrencyContext';
import { CartProvider } from './src/context/CartContext';

try {
  const html = renderToString(
    <StaticRouter location="/men">
      <CurrencyProvider>
        <CartProvider>
          <Men />
        </CartProvider>
      </CurrencyProvider>
    </StaticRouter>
  );
  console.log("SUCCESS. Rendered length:", html.length);
} catch (err) {
  console.error("ERROR CRASH:", err);
}
