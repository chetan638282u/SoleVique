import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import PriceDisplay from '../components/PriceDisplay';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const query = searchQuery.trim().toLowerCase();
  
  const filteredProducts = query === '' ? [] : products.filter(product => {
    const matchName = product.name.toLowerCase().includes(query);
    const matchCategory = product.categories.some(cat => cat.toLowerCase().includes(query));
    return matchName || matchCategory;
  });

  // Extract all unique categories
  let allCategories = new Set();
  products.forEach(p => p.categories.forEach(c => allCategories.add(c)));
  allCategories = Array.from(allCategories).sort();

  // Filter categories based on query, or show all if query is empty
  const matchedCategories = query === '' 
    ? allCategories 
    : allCategories.filter(c => c.toLowerCase().includes(query));

  const handleProductClick = (product) => {
    navigate('/product', { state: { name: product.name, price: product.price, image: product.image } });
  };

  const handleCategoryClick = (category) => {
    setSearchQuery(category);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="flex flex-col bg-white min-h-[calc(100vh-80px)] w-full max-w-[1360px] mx-auto">
      <div className="p-4 md:p-8 border-b border-neutral-200 sticky top-20 bg-white z-10 flex gap-2 shadow-sm">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search shoes, categories..."
          className="w-full bg-neutral-100 rounded-xl p-4 outline-none text-base text-brand-black font-medium placeholder:font-normal placeholder:text-neutral-500"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="p-4 text-brand-charcoal hover:text-brand-black font-bold uppercase text-xs tracking-wider"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        {filteredProducts.length > 0 || matchedCategories.length > 0 ? (
          <div className="flex flex-col gap-8 pb-10">
            {matchedCategories.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
                  {query === '' ? 'All Categories' : 'Matching Categories'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {matchedCategories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      className="px-4 py-2 bg-neutral-100 hover:bg-brand-ember hover:text-white transition-colors rounded-full text-sm font-semibold text-brand-charcoal"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(query !== '' || filteredProducts.length > 0) && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">Products ({filteredProducts.length})</h4>
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map((product, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleProductClick(product)}
                        className="flex items-center gap-4 text-left group bg-white border border-neutral-100 p-2 rounded-xl hover:shadow-md transition-shadow"
                      >
                        <div className="w-20 h-20 bg-[#F4F4F4] flex items-center justify-center rounded-lg overflow-hidden shrink-0 group-hover:bg-[#EAEAEA] transition-colors">
                          <img src={product.image} alt={product.name} className="w-16 h-16 object-contain group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-brand-black line-clamp-2 group-hover:text-brand-ember transition-colors">{product.name}</p>
                          <p className="text-sm font-bold text-brand-charcoal mt-1"><PriceDisplay amount={product.price} /></p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500">No products found.</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 text-neutral-400">
            <p className="text-sm font-semibold text-brand-black">No results found for "{searchQuery}"</p>
            <p className="text-xs mt-1">Try searching for "sneaker" or "women"</p>
          </div>
        )}
      </div>
    </div>
  );
}
