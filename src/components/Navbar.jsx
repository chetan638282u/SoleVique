import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import GlobalSearch from './GlobalSearch';

export default function Navbar() {
  const { currency, setCurrency } = useCurrency();
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      
<header className="sticky top-0 z-50 w-full bg-white border-b border-brand-border transition-all" data-purpose="main-navigation" >
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

<div className="flex items-center gap-3">
<Link aria-label="SoleVique Homepage" className="group flex items-center gap-2" to="/">
<div className="w-8 h-8 bg-brand-black flex items-center justify-center rounded-lg text-white font-black text-lg tracking-tighter group-hover:bg-brand-ember transition duration-300">
            SV
          </div>
<span className="font-architectural text-2xl tracking-tighter text-brand-black">SoleVique</span>
</Link>
</div>

<nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-brand-charcoal" >
  <NavLink className={({isActive}) => isActive ? 'text-brand-ember py-1 relative' : 'hover:text-brand-ember transition-colors py-1 relative'} to="/">Home</NavLink>
  <NavLink className={({isActive}) => isActive ? 'text-brand-ember py-1 relative' : 'hover:text-brand-ember transition-colors py-1 relative'} to="/men">Men</NavLink>
  <NavLink className={({isActive}) => isActive ? 'text-brand-ember py-1 relative' : 'hover:text-brand-ember transition-colors py-1 relative'} to="/women">Women</NavLink>
  <NavLink className={({isActive}) => isActive ? 'text-brand-ember py-1 relative' : 'hover:text-brand-ember transition-colors py-1 relative'} to="/new-arrivals">
    <span className="">New Arrivals</span>
  </NavLink>
  <NavLink className={({isActive}) => isActive ? 'text-brand-ember py-1' : 'hover:text-brand-ember transition-colors py-1'} to="/sale">Sale</NavLink>
</nav>

<div className="flex items-center gap-2 sm:gap-4" >
  <GlobalSearch /><button aria-label="Account" className="p-2 rounded-xl text-brand-charcoal hover:bg-black/5 hover:text-brand-black transition duration-200 flex items-center justify-center"  type="button"><svg className="w-5 h-5" fill="none" height="20" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" vectorEffect="non-scaling-stroke" viewBox="0 0 24 24" width="20"><circle cx="12" cy="7" r="4"></circle><path d="M5 21a7 7 0 0 1 14 0"></path></svg></button>
  <Link aria-label="Cart" to="/cart" className="relative p-2 rounded-xl bg-brand-charcoal text-white hover:bg-brand-ember transition duration-200 flex items-center justify-center shadow-sm">
    <svg className="w-5 h-5" fill="none" height="20" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" vectorEffect="non-scaling-stroke" viewBox="0 0 24 24" width="20"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" x2="21" y1="6" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
    {cartItemCount > 0 && (
      <span className="absolute -top-1.5 -right-1.5 bg-brand-ember text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm ring-2 ring-white">
        {cartItemCount}
      </span>
    )}
  </Link>
</div>
</div>
</header>

    </>
  );
}
