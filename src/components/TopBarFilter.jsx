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
  
  // Mobile Filter State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Dropdown States
  const [activeDropdown, setActiveDropdown] = useState(null); // 'category', 'size', 'price', 'sort'

  // Refs for outside click detection
  const filterContainerRef = useRef(null);
  useOutsideClick(filterContainerRef, () => setActiveDropdown(null));

  // Initialize maxPrice when products load
  useEffect(() => {
    setMaxPrice(maxPossiblePrice);
  }, [maxPossiblePrice]);

  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      sizes: selectedSizes,
      minPrice,
      maxPrice,
      sortMethod
    });
  }, [selectedCategories, selectedSizes, minPrice, maxPrice, sortMethod, onFilterChange]);

  // Lock body scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileFilterOpen]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(prev => prev === dropdownName ? null : dropdownName);
  };

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 100);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 100);
    setMaxPrice(value);
  };

  const minPercent = maxPossiblePrice > 0 ? (minPrice / maxPossiblePrice) * 100 : 0;
  const maxPercent = maxPossiblePrice > 0 ? (maxPrice / maxPossiblePrice) * 100 : 100;

  return (
    <>
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
          
          {/* MOBILE ONLY: Filter Button */}
          <div className="flex md:hidden w-full items-center">
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex w-full items-center justify-between px-4 py-3 border border-neutral-300 bg-white hover:bg-neutral-50 text-sm font-semibold tracking-wider text-brand-black uppercase transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">tune</span>
                Filter & Sort
              </div>
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>

          {/* Left Side: Filter Dropdowns (DESKTOP ONLY) */}
          <div className="hidden md:flex flex-wrap items-center gap-3">
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
                            ? 'bg-brand-ember text-white border-brand-ember' 
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
                      className="absolute h-full bg-brand-charcoal" 
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

          {/* Right Side: Sorting Dropdown (DESKTOP ONLY) */}
          <div className="hidden md:block relative">
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
                  className={`text-left px-4 py-2 text-sm ${sortMethod === "Recommended" ? "bg-brand-ember text-white" : "hover:bg-neutral-100 text-brand-black"}`}
                >
                  Recommended
                </button>
                <button 
                  onClick={() => { setSortMethod("Price Low To High"); setActiveDropdown(null); }}
                  className={`text-left px-4 py-2 text-sm ${sortMethod === "Price Low To High" ? "bg-brand-ember text-white" : "hover:bg-neutral-100 text-brand-black"}`}
                >
                  Price Low To High
                </button>
                <button 
                  onClick={() => { setSortMethod("Price High To Low"); setActiveDropdown(null); }}
                  className={`text-left px-4 py-2 text-sm ${sortMethod === "Price High To Low" ? "bg-brand-ember text-white" : "hover:bg-neutral-100 text-brand-black"}`}
                >
                  Price High To Low
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FULL-SCREEN OVERLAY */}
      <div 
        className={`fixed inset-0 bg-white z-[100] transform transition-transform duration-300 ease-in-out flex flex-col md:hidden ${isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <h2 className="font-architectural text-xl tracking-wide uppercase font-bold text-brand-black">Filters & Sort</h2>
          <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
          
          {/* Mobile Sort */}
          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs text-neutral-500 mb-4">Sort By</h3>
            <div className="space-y-2">
              <label className="flex items-center justify-between cursor-pointer group p-3 border border-neutral-200 rounded-lg hover:border-brand-ember transition-colors">
                <span className="font-semibold text-brand-black">Recommended</span>
                <input 
                  type="radio" 
                  name="mobile-sort" 
                  className="accent-brand-ember w-4 h-4"
                  checked={sortMethod === "Recommended"}
                  onChange={() => setSortMethod("Recommended")}
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer group p-3 border border-neutral-200 rounded-lg hover:border-brand-ember transition-colors">
                <span className="font-semibold text-brand-black">Price Low To High</span>
                <input 
                  type="radio" 
                  name="mobile-sort" 
                  className="accent-brand-ember w-4 h-4"
                  checked={sortMethod === "Price Low To High"}
                  onChange={() => setSortMethod("Price Low To High")}
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer group p-3 border border-neutral-200 rounded-lg hover:border-brand-ember transition-colors">
                <span className="font-semibold text-brand-black">Price High To Low</span>
                <input 
                  type="radio" 
                  name="mobile-sort" 
                  className="accent-brand-ember w-4 h-4"
                  checked={sortMethod === "Price High To Low"}
                  onChange={() => setSortMethod("Price High To Low")}
                />
              </label>
            </div>
          </div>

          <hr className="border-neutral-200"/>

          {/* Mobile Category */}
          {availableCategories.length > 0 && (
            <div>
              <h3 className="font-bold uppercase tracking-widest text-xs text-neutral-500 mb-4">Category</h3>
              <div className="space-y-3">
                {availableCategories.map(cat => (
                  <label key={cat} className="flex items-center cursor-pointer group hover:text-brand-ember">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 accent-brand-ember cursor-pointer border-neutral-300 mr-3 rounded"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
                    />
                    <span className="font-medium text-lg text-brand-black group-hover:text-brand-ember transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <hr className="border-neutral-200"/>

          {/* Mobile Size */}
          {availableSizes.length > 0 && (
            <div>
              <h3 className="font-bold uppercase tracking-widest text-xs text-neutral-500 mb-4">Size</h3>
              <div className="grid grid-cols-4 gap-3">
                {availableSizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`h-12 flex items-center justify-center font-bold text-lg rounded-lg transition-colors border ${
                      selectedSizes.includes(size) 
                      ? 'bg-brand-ember text-white border-brand-ember shadow-md' 
                      : 'bg-white hover:bg-neutral-100 border-neutral-300 text-brand-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <hr className="border-neutral-200"/>

          {/* Mobile Price */}
          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs text-neutral-500 mb-6">Price Range</h3>
            <div className="px-2">
              <div className="relative w-full h-2 bg-neutral-200 mb-8 rounded-full">
                <div 
                  className="absolute h-full bg-brand-charcoal rounded-full" 
                  style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
                ></div>
                <input
                  type="range" min="0" max={maxPossiblePrice} value={minPrice} onChange={handleMinChange}
                  className="absolute w-full h-2 opacity-0 cursor-pointer z-10"
                />
                <input
                  type="range" min="0" max={maxPossiblePrice} value={maxPrice} onChange={handleMaxChange}
                  className="absolute w-full h-2 opacity-0 cursor-pointer z-20"
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-brand-charcoal rounded-full pointer-events-none shadow-md"
                  style={{ left: `calc(${minPercent}% - 12px)` }}
                ></div>
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-brand-charcoal rounded-full pointer-events-none shadow-md"
                  style={{ left: `calc(${maxPercent}% - 12px)` }}
                ></div>
              </div>
              <div className="flex items-center justify-between font-bold text-brand-black">
                <span className="px-4 py-2 border border-neutral-300 rounded-lg">₹{minPrice}</span>
                <span className="text-neutral-400 uppercase text-xs tracking-widest">To</span>
                <span className="px-4 py-2 border border-neutral-300 rounded-lg">₹{maxPrice}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-white border-t border-neutral-200 flex gap-4">
          <button 
            onClick={() => { setSelectedCategories([]); setSelectedSizes([]); setMinPrice(0); setMaxPrice(maxPossiblePrice); setSortMethod("Recommended"); }}
            className="flex-1 py-4 border border-brand-black text-brand-black font-bold uppercase tracking-widest rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Clear
          </button>
          <button 
            onClick={() => setIsMobileFilterOpen(false)}
            className="flex-1 py-4 bg-brand-black text-white font-bold uppercase tracking-widest rounded-lg hover:bg-brand-ember transition-colors shadow-lg"
          >
            Apply
          </button>
        </div>
      </div>

    </>
  );
}
