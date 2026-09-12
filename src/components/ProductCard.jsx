import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PriceDisplay from './PriceDisplay';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, className = '' }) {
  const { addToCart } = useCart();
  const [showButton, setShowButton] = useState(false);
  const touchTimer = useRef(null);
  const hideTimer = useRef(null);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(touchTimer.current);
      clearTimeout(hideTimer.current);
    };
  }, []);

  const handleTouchStart = () => {
    // If the user holds for 500ms, show the button
    touchTimer.current = setTimeout(() => {
      setShowButton(true);
      
      // Auto-hide after 1.5 seconds of appearing if they don't interact
      hideTimer.current = setTimeout(() => {
        setShowButton(false);
      }, 1500);
      
    }, 500);
  };

  const handleTouchEnd = () => {
    // If they let go before 500ms, it's a tap, so cancel the hold timer
    clearTimeout(touchTimer.current);
  };

  const handleTouchMove = () => {
    // If they start scrolling, cancel the hold timer
    clearTimeout(touchTimer.current);
  };

  return (
    <Link 
      to={`/product?id=${encodeURIComponent(product.name)}`} 
      state={{ name: product.name, price: product.price, image: product.image, categories: product.categories, sizes: product.sizes }} 
      className={`flex flex-col cursor-pointer group ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchCancel={handleTouchEnd}
    >
      <div className="w-full aspect-[4/5] md:aspect-square bg-[#F4F4F4] overflow-hidden flex items-center justify-center p-2 md:p-6 relative">
        <img 
          alt={product.name} 
          className="w-full h-full object-contain pointer-events-none select-none mix-blend-multiply" 
          src={product.image} 
        />
        <button 
          className={`absolute bottom-3 left-3 right-3 bg-brand-black text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg transition-opacity duration-300 lg:group-hover:opacity-100 ${showButton ? 'opacity-100 z-10' : 'opacity-0 -z-10 lg:z-10'}`} 
          type="button" 
          onClick={(e) => { 
            e.preventDefault(); 
            e.stopPropagation();
            addToCart(product, 1, product.sizes?.[0] || '8');
            setShowButton(false);
          }}
        >
          Add to Bag
        </button>
      </div>
      <p className="text-sm text-brand-charcoal font-normal leading-snug mt-3 px-1 truncate">{product.name}</p>
      <p className="text-[13px] text-black font-medium mt-0.5 px-1"><PriceDisplay amount={product.price} /></p>
    </Link>
  );
}
