import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('INR');

  // Assuming 1 USD = 83.5 INR for conversion
  const CONVERSION_RATE = 83.5;

  const formatPrice = (amountInInr) => {
    if (currency === 'USD') {
      const amountInUsd = amountInInr / CONVERSION_RATE;
      return '$' + amountInUsd.toFixed(2);
    } else {
      // Format as INR
      return 'Rs. ' + amountInInr.toLocaleString('en-IN', { maximumFractionDigits: 2 });
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}
