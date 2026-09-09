import React, { useState, useEffect, useMemo, useRef } from 'react';

// Custom hook to detect clicks outside of a component
function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export default function TopBarFilter({ allProducts, onFilterChange }) {
  // Compute unique filter options from the provided products
  const availableCategories = useMemo(() => {
    const cats = new Set();
    allProducts.forEach(p => {
      p.categories?.forEach(c => cats.add(c));
    });
    return Array.from(cats).sort();
  }, [allProducts]);

  const availableSizes = useMemo(() => {
    const sizes = new Set();
    allProducts.forEach(p => {
      p.sizes?.forEach(s => sizes.add(s));
    });
    return Array.from(sizes).sort((a, b) => a - b);
  }, [allProducts]);

  const maxPossiblePrice = useMemo(() => {
    let max = 0;
    allProducts.forEach(p => {
      if (p.price > max) max = p.price;
    });
    return max || 10000;
  }, [allProducts]);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(maxPossiblePrice);
  const [sortMethod, setSortMethod] = useState("Recommended");

  // Dropdown States
  const [activeDropdown, setActiveDropdown] = useState(null); // 'category', 'size', 'price', 'sort'

  // Refs for outside click detection
  const filterContainerRef = useRef(null);
  useOutsideClick(filterContainerRef, () => setActiveDropdown(null));

  // Initialize maxPrice when products load
  useEffect(() => {
    setMaxPrice(maxPossiblePrice);
  }, [maxPossiblePrice]);

  // Apply filters whenever state changes
  useEffect(() => {
    let filtered = allProducts.filter(product => {
      // 1. Category check
      if (selectedCategories.length > 0) {
        const hasMatchingCat = product.categories?.some(c => selectedCategories.includes(c));
        if (!hasMatchingCat) return false;
      }
      
      // 2. Size check
      if (selectedSizes.length > 0) {
        const hasMatchingSize = product.sizes?.some(s => selectedSizes.includes(s));
        if (!hasMatchingSize) return false;
      }

      // 3. Price check
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      return true;
    });

    // 4. Sort
    if (sortMethod === "Price Low To High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortMethod === "Price High To Low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    onFilterChange(filtered);
  }, [selectedCategories, selectedSizes, minPrice, maxPrice, sortMethod, allProducts, onFilterChange]);

  const handleCategoryToggle = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 100);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 100);
    setMaxPrice(value);
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(prev => prev === dropdownName ? null : dropdownName);
  };

  const minPercent = maxPossiblePrice > 0 ? (minPrice / maxPossiblePrice) * 100 : 0;
  const maxPercent = maxPossiblePrice > 0 ? (maxPrice / maxPossiblePrice) * 100 : 100;

  return (
    <div className="mx-8 md:mx-16 lg:mx-24 border border-neutral-200 py-3 mb-8 bg-white z-40 sticky top-20 rounded-none shadow-sm" ref={filterContainerRef}>
      <style dangerouslySetInnerHTML={{__html: `
        input[type=range]::-webkit-slider-thumb {
          pointer-events: all;
          width: 16px;
          height: 16px;
          -webkit-appearance: none;
        }
      `}} />
      <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop flex flex-wrap items-center justify-between gap-4 w-full">
        
        {/* Left Side: Filter Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 mr-4">
            <span className="material-symbols-outlined text-[20px] text-primary">tune</span>
          </div>

          {/* Category Dropdown */}
          {availableCategories.length > 0 && (
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('category')}
                className="flex items-center gap-2 px-4 py-2 border border-neutral-300 bg-white hover:bg-neutral-50 text-sm font-semibold text-brand-black transition-colors"
              >
                Category
                <span className="material-symbols-outlined text-[18px]">
                  {activeDropdown === 'category' ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              
              {activeDropdown === 'category' && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-neutral-300 shadow-lg p-4 z-50">
                  <div className="space-y-3 font-body-sm text-on-surface-variant">
                    {availableCategories.map(cat => (
                      <label key={cat} className="flex items-center cursor-pointer group hover:text-secondary">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 accent-secondary cursor-pointer border-neutral-300 mr-3"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => handleCategoryToggle(cat)}
                        />
                        <span className="font-medium group-hover:text-secondary transition-colors">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Size Dropdown */}
          {availableSizes.length > 0 && (
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('size')}
                className="flex items-center gap-2 px-4 py-2 border border-neutral-300 bg-white hover:bg-neutral-50 text-sm font-semibold text-brand-black transition-colors"
              >
                Size
                <span className="material-symbols-outlined text-[18px]">
                  {activeDropdown === 'size' ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              
              {activeDropdown === 'size' && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-neutral-300 shadow-lg p-4 z-50">
                  <div className="grid grid-cols-4 gap-2">
                    {availableSizes.map(size => (
                      <button 
                        key={size}
                        onClick={() => handleSizeToggle(size)}
                        className={`h-10 text-on-surface font-label-sm text-label-sm font-semibold transition-colors border ${
                          selectedSizes.includes(size) 
                          ? 'bg-primary text-on-primary border-primary' 
                          : 'bg-white hover:bg-neutral-100 border-neutral-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Price Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('price')}
              className="flex items-center gap-2 px-4 py-2 border border-neutral-300 bg-white hover:bg-neutral-50 text-sm font-semibold text-brand-black transition-colors"
            >
              Price
              <span className="material-symbols-outlined text-[18px]">
                {activeDropdown === 'price' ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            
            {activeDropdown === 'price' && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-neutral-300 shadow-lg p-5 z-50">
                <div className="relative w-full h-1.5 bg-neutral-200 mb-8 mt-2">
                  <div 
                    className="absolute h-full bg-secondary" 
                    style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
                  ></div>
                  <input
                    type="range" min="0" max={maxPossiblePrice} value={minPrice} onChange={handleMinChange}
                    className="absolute w-full h-1.5 opacity-0 cursor-pointer pointer-events-none z-10 appearance-none"
                  />
                  <input
                    type="range" min="0" max={maxPossiblePrice} value={maxPrice} onChange={handleMaxChange}
                    className="absolute w-full h-1.5 opacity-0 cursor-pointer pointer-events-none z-20 appearance-none"
                  />
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-neutral-400 pointer-events-none shadow-sm"
                    style={{ left: `calc(${minPercent}% - 8px)` }}
                  ></div>
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-neutral-400 pointer-events-none shadow-sm"
                    style={{ left: `calc(${maxPercent}% - 8px)` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="px-3 py-1 border border-neutral-300 font-semibold">₹{minPrice}</span>
                  <span className="text-on-surface-variant font-bold uppercase">To</span>
                  <span className="px-3 py-1 border border-neutral-300 font-semibold">₹{maxPrice}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Sorting Dropdown */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('sort')}
            className="flex items-center justify-between gap-2 px-4 py-2 border border-neutral-300 bg-white hover:bg-neutral-50 text-sm font-bold uppercase tracking-wider text-brand-black transition-colors w-56"
          >
            {sortMethod.toUpperCase()}
            <span className="material-symbols-outlined text-[18px]">
              {activeDropdown === 'sort' ? 'expand_less' : 'expand_more'}
            </span>
          </button>
          
          {activeDropdown === 'sort' && (
            <div className="absolute top-full right-0 mt-1 w-56 bg-white border border-neutral-300 shadow-lg z-50 flex flex-col">
              <button 
                onClick={() => { setSortMethod("Recommended"); setActiveDropdown(null); }}
                className={`text-left px-4 py-2 text-sm ${sortMethod === "Recommended" ? "bg-blue-600 text-white" : "hover:bg-neutral-100 text-brand-black"}`}
              >
                Recommended
              </button>
              <button 
                onClick={() => { setSortMethod("Price Low To High"); setActiveDropdown(null); }}
                className={`text-left px-4 py-2 text-sm ${sortMethod === "Price Low To High" ? "bg-blue-600 text-white" : "hover:bg-neutral-100 text-brand-black"}`}
              >
                Price Low To High
              </button>
              <button 
                onClick={() => { setSortMethod("Price High To Low"); setActiveDropdown(null); }}
                className={`text-left px-4 py-2 text-sm ${sortMethod === "Price High To Low" ? "bg-blue-600 text-white" : "hover:bg-neutral-100 text-brand-black"}`}
              >
                Price High To Low
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
