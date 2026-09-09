import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity, size) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.name === product.name && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.name === product.name && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, size }];
    });
  };

  const removeFromCart = (name, size) => {
    setCartItems(prev => prev.filter(item => !(item.name === name && item.size === size)));
  };

  const updateQuantity = (name, size, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.name === name && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
