import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import GlobalSearch from './GlobalSearch';

export default function Navbar() {
  const { currency, setCurrency } = useCurrency();
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white border-b border-brand-border transition-all" data-purpose="main-navigation" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Mobile Left: Hamburger & Search */}
          <div className="flex md:hidden flex-1 items-center justify-start gap-1">
            <button 
              aria-label="Open Mobile Menu"
              className="p-2 -ml-2 text-brand-charcoal hover:text-brand-black transition-colors" 
              onClick={() => setIsMobileMenuOpen(true)}
              type="button"
            >
              <span className="material-symbols-outlined text-[28px]">menu</span>
            </button>
            <GlobalSearch />
          </div>

          {/* Desktop Left: Logo */}
          <div className="hidden md:flex flex-none items-center gap-3">
            <Link aria-label="SoleVique Homepage" className="group flex items-center gap-2" to="/">
              <div className="w-8 h-8 bg-brand-black flex items-center justify-center rounded-lg text-white font-black text-lg tracking-tighter group-hover:bg-brand-ember transition duration-300">
                SV
              </div>
              <span className="font-architectural text-2xl tracking-tighter text-brand-black">SoleVique</span>
            </Link>
          </div>

          {/* Mobile Center: Logo */}
          <div className="flex md:hidden flex-1 items-center justify-center">
            <Link aria-label="SoleVique Homepage" className="flex items-center" to="/">
              <span className="font-architectural text-2xl tracking-tighter text-brand-black">SoleVique</span>
            </Link>
          </div>

          {/* Desktop Center: Nav */}
          <nav aria-label="Main Navigation" className="hidden md:flex flex-none items-center gap-8 text-sm font-semibold tracking-wide text-brand-charcoal" >
            <NavLink className={({isActive}) => isActive ? 'text-brand-ember py-1 relative' : 'hover:text-brand-ember transition-colors py-1 relative'} to="/">Home</NavLink>
            <NavLink className={({isActive}) => isActive ? 'text-brand-ember py-1 relative' : 'hover:text-brand-ember transition-colors py-1 relative'} to="/men">Men</NavLink>
            <NavLink className={({isActive}) => isActive ? 'text-brand-ember py-1 relative' : 'hover:text-brand-ember transition-colors py-1 relative'} to="/women">Women</NavLink>
            <NavLink className={({isActive}) => isActive ? 'text-brand-ember py-1 relative' : 'hover:text-brand-ember transition-colors py-1 relative'} to="/new-arrivals">
              <span className="">New Arrivals</span>
            </NavLink>
            <NavLink className={({isActive}) => isActive ? 'text-brand-ember py-1' : 'hover:text-brand-ember transition-colors py-1'} to="/sale">Sale</NavLink>
          </nav>

          {/* Right: Actions */}
          <div className="flex flex-1 md:flex-none items-center justify-end gap-2 sm:gap-4" >
            <div className="hidden md:block">
              <GlobalSearch />
            </div>
            <button aria-label="Account" className="p-2 rounded-xl text-brand-charcoal hover:bg-black/5 hover:text-brand-black transition duration-200 flex items-center justify-center"  type="button">
              <svg className="w-5 h-5" fill="none" height="20" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" vectorEffect="non-scaling-stroke" viewBox="0 0 24 24" width="20"><circle cx="12" cy="7" r="4"></circle><path d="M5 21a7 7 0 0 1 14 0"></path></svg>
            </button>
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

      {/* Mobile Slide-Out Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden transition-opacity" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
      
      {/* Mobile Slide-Out Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-[70vw] max-w-[320px] bg-white z-[70] transform transition-transform duration-300 ease-in-out md:hidden flex flex-col shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-neutral-100">
          <span className="font-architectural text-2xl tracking-tighter text-brand-black">SoleVique</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-500 hover:text-brand-black bg-neutral-100 p-2 rounded-full w-8 h-8 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <nav className="flex flex-col p-6 font-semibold text-lg tracking-wide text-brand-charcoal overflow-y-auto">
          <p className="text-xs uppercase text-neutral-400 mb-4 tracking-widest font-bold">Main</p>
          <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/" className={({isActive}) => `py-3 border-b border-neutral-50 transition-colors ${isActive ? 'text-brand-ember' : 'hover:text-brand-ember'}`}>Home</NavLink>
          <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/men" className={({isActive}) => `py-3 border-b border-neutral-50 transition-colors ${isActive ? 'text-brand-ember' : 'hover:text-brand-ember'}`}>Men</NavLink>
          <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/women" className={({isActive}) => `py-3 border-b border-neutral-50 transition-colors ${isActive ? 'text-brand-ember' : 'hover:text-brand-ember'}`}>Women</NavLink>
          <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/new-arrivals" className={({isActive}) => `py-3 border-b border-neutral-50 transition-colors ${isActive ? 'text-brand-ember' : 'hover:text-brand-ember'}`}>New Arrivals</NavLink>
          <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/sale" className={({isActive}) => `py-3 transition-colors ${isActive ? 'text-brand-ember' : 'hover:text-brand-ember'}`}>Sale</NavLink>
          
          <p className="text-xs uppercase text-neutral-400 mt-8 mb-4 tracking-widest font-bold">Categories</p>
          <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/running" className={({isActive}) => `py-3 border-b border-neutral-50 transition-colors ${isActive ? 'text-brand-ember' : 'hover:text-brand-ember'}`}>Running</NavLink>
          <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/casual" className={({isActive}) => `py-3 border-b border-neutral-50 transition-colors ${isActive ? 'text-brand-ember' : 'hover:text-brand-ember'}`}>Casual</NavLink>
          <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/formal" className={({isActive}) => `py-3 border-b border-neutral-50 transition-colors ${isActive ? 'text-brand-ember' : 'hover:text-brand-ember'}`}>Formal</NavLink>
          <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/sandals" className={({isActive}) => `py-3 border-b border-neutral-50 transition-colors ${isActive ? 'text-brand-ember' : 'hover:text-brand-ember'}`}>Sandals</NavLink>
          <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/sports" className={({isActive}) => `py-3 transition-colors ${isActive ? 'text-brand-ember' : 'hover:text-brand-ember'}`}>Sports</NavLink>
        </nav>
      </div>
    </>
  );
}
