import React from 'react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up">
      <div className="bg-black text-white px-8 py-4 shadow-xl text-xs tracking-[0.1em] font-semibold uppercase">
        Added to cart
      </div>
    </div>
  );
}
