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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [showPortfolioNotice, setShowPortfolioNotice] = useState(false);
  const location = useLocation();

  // Smart Sticky Navbar State
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen || isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen, isAuthModalOpen]);

  // Scroll detection for smart sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down & past navbar height -> hide
        setIsVisible(false);
      } else {
        // Scrolling up -> show
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header className={`sticky top-0 z-50 w-full bg-white border-b border-brand-border transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full lg:translate-y-0'}`} data-purpose="main-navigation" >
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
            <button onClick={() => setIsAuthModalOpen(true)} aria-label="Account" className="p-2 rounded-xl text-brand-charcoal hover:bg-black/5 hover:text-brand-black transition duration-200 flex items-center justify-center" type="button">
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
    
      {/* Auth Modal Overlay */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-opacity" onClick={() => { setIsAuthModalOpen(false); setShowPortfolioNotice(false); }}>
          <div className="bg-white w-full max-w-md shadow-2xl relative flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <h2 className="font-bold text-xl uppercase tracking-tight text-brand-black">
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </h2>
              <button onClick={() => { setIsAuthModalOpen(false); setShowPortfolioNotice(false); }} className="text-neutral-400 hover:text-brand-black transition-colors" type="button">
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-4">
              
              {showPortfolioNotice ? (
                <div className="flex flex-col items-center text-center py-4">
                  <span className="material-symbols-outlined text-[48px] text-brand-black mb-4">info</span>
                  <h3 className="font-bold text-lg uppercase tracking-tight text-brand-black mb-2">Portfolio Notice</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    This is a portfolio showcase website. In a live production environment, this would integrate with Google OAuth and a secure backend authentication service to sign you into your account.
                  </p>
                  <button onClick={() => setShowPortfolioNotice(false)} className="mt-6 font-bold text-xs uppercase tracking-wider text-brand-black hover:underline" type="button">
                    Go Back
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Email Address</label>
                    <input type="email" placeholder="Enter your email ID" className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-brand-black transition-colors" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Password</label>
                      {authMode === 'signin' && (
                        <button className="text-[10px] uppercase font-bold text-brand-black hover:underline" type="button">Forgot Password?</button>
                      )}
                    </div>
                    <input type="password" placeholder="Enter your password" className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-brand-black transition-colors" />
                  </div>

                  <button onClick={() => setShowPortfolioNotice(true)} className="w-full bg-brand-black text-white font-bold text-sm uppercase tracking-wider py-3.5 mt-2 hover:bg-neutral-800 transition-colors" type="button">
                    {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                  </button>

                  <div className="relative flex items-center justify-center my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-200"></div>
                    </div>
                    <div className="relative bg-white px-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Or</div>
                  </div>

                  <button onClick={() => setShowPortfolioNotice(true)} className="w-full border border-neutral-300 bg-white text-brand-black font-bold text-sm tracking-wide py-3.5 flex items-center justify-center gap-3 hover:bg-neutral-50 transition-colors" type="button">
                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.369 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.109 -17.884 43.989 -14.754 43.989 Z"/></g></svg>
                    Continue with Google
                  </button>
                  
                  <div className="text-center mt-4 text-xs text-neutral-500">
                    {authMode === 'signin' ? (
                      <p>Don't have an account? <button onClick={() => setAuthMode('signup')} className="font-bold text-brand-black hover:underline uppercase ml-1" type="button">Create One</button></p>
                    ) : (
                      <p>Already have an account? <button onClick={() => setAuthMode('signin')} className="font-bold text-brand-black hover:underline uppercase ml-1" type="button">Sign In</button></p>
                    )}
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
