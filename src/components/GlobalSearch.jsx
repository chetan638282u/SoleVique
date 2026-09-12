import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import PriceDisplay from './PriceDisplay';

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Derived state: Filtered products
  const query = searchQuery.trim().toLowerCase();
  
  const filteredProducts = query === '' ? [] : products.filter(product => {
    const matchName = product.name.toLowerCase().includes(query);
    const matchCategory = product.categories.some(cat => cat.toLowerCase().includes(query));
    return matchName || matchCategory;
  });

  // Extract unique matched categories from the filtered products, OR directly match query with categories
  // If the query matches a category name directly, we prioritize those.
  let matchedCategories = [];
  if (query !== '') {
    const allMatchingCats = new Set();
    
    // First check if query matches any category explicitly across all products
    products.forEach(p => {
      p.categories.forEach(c => {
        if (c.toLowerCase().includes(query)) {
          allMatchingCats.add(c);
        }
      });
    });

    // We only want categories that explicitly match the query, 
    // so we don't add all categories from filtered products.

    matchedCategories = Array.from(allMatchingCats).sort().slice(0, 5); // limit to 5
  }

  const handleProductClick = (product) => {
    setIsOpen(false);
    setSearchQuery('');
    navigate('/product', { state: { name: product.name, price: product.price, image: product.image } });
  };

  const handleCategoryClick = (category) => {
    // Navigate to Men or Women based on category, or just set search query
    setSearchQuery(category);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Toggle Button & Input */}
      <div className={`flex items-center transition-all duration-300 ${isOpen ? 'bg-white border border-brand-border rounded-xl px-3 py-1 shadow-sm w-[280px] sm:w-[400px]' : 'bg-transparent w-auto'}`}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Search Catalog" 
          className="p-2 rounded-xl text-brand-charcoal hover:bg-black/5 hover:text-brand-black transition duration-200 flex items-center justify-center shrink-0"
          type="button"
        >
          <svg className="w-5 h-5" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" viewBox="0 0 24 24" width="20">
            <circle cx="11" cy="11" r="7.5"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
        </button>
        
        {isOpen && (
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search shoes, categories..."
            className="w-full bg-transparent outline-none text-sm text-brand-black ml-2 font-medium placeholder:font-normal placeholder:text-neutral-400"
          />
        )}
        
        {isOpen && searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="p-1 rounded-full text-neutral-400 hover:text-brand-black transition-colors shrink-0 ml-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && searchQuery && (
        <div className="absolute top-full right-0 mt-3 w-[320px] sm:w-[500px] bg-white border border-brand-border rounded-2xl shadow-xl overflow-hidden z-50 animate-fade-in">
          {filteredProducts.length > 0 || matchedCategories.length > 0 ? (
            <div className="flex flex-col sm:flex-row min-h-[300px]">
              
              {/* Left Side: Categories */}
              <div className="w-full sm:w-1/3 bg-neutral-50/80 p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-brand-border">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">Categories</h4>
                {matchedCategories.length > 0 ? (
                  <ul className="space-y-2">
                    {matchedCategories.map(cat => (
                      <li key={cat}>
                        <button 
                          onClick={() => handleCategoryClick(cat)}
                          className="text-sm font-semibold text-brand-charcoal hover:text-brand-ember transition-colors text-left w-full"
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-neutral-400 italic">No exact categories</p>
                )}
              </div>

              {/* Right Side: Products */}
              <div className="w-full sm:w-2/3 p-4 sm:p-5 max-h-[400px] overflow-y-auto scrollbar-thin">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">Products</h4>
                {filteredProducts.length > 0 ? (
                  <ul className="space-y-4">
                    {filteredProducts.slice(0, 6).map((product, idx) => (
                      <li key={idx}>
                        <button 
                          onClick={() => handleProductClick(product)}
                          className="flex items-center gap-4 w-full text-left group"
                        >
                          <div className="w-12 h-12 bg-[#F4F4F4] flex items-center justify-center overflow-hidden shrink-0 group-hover:bg-[#EAEAEA] transition-colors">
                            <img src={product.image} alt={product.name} className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-brand-black group-hover:text-brand-ember transition-colors line-clamp-1">{product.name}</p>
                            <p className="text-xs font-medium text-brand-charcoal mt-0.5"><PriceDisplay amount={product.price} /></p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-brand-charcoal">No products found for "{searchQuery}"</p>
                )}
                {filteredProducts.length > 6 && (
                  <div className="mt-4 pt-4 border-t border-brand-border text-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                      +{filteredProducts.length - 6} more results
                    </span>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="p-8 text-center">
              <svg className="w-8 h-8 text-neutral-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <p className="text-sm font-semibold text-brand-black">No results found</p>
              <p className="text-xs text-neutral-500 mt-1">Try searching for "sneaker", "loafer", or "women"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
