const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, '..', 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(homePath, 'utf8');

if (!content.includes("import React, { useRef, useState, useEffect }")) {
    content = content.replace("import React, { useRef } from 'react';", "import React, { useRef, useState, useEffect } from 'react';");
}

const homeFnMatch = content.match(/export default function Home\(\) \{/);
if (homeFnMatch) {
    if (!content.includes("const [canScrollLeft, setCanScrollLeft] = useState(false);")) {
        const replaceStateStr = `
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
`;
        
        // Remove old scroll and add new one
        const oldScrollStart = content.indexOf("const scrollContainerRef = useRef(null);");
        const oldScrollEnd = content.indexOf("const trendingProducts = products.slice(0, 7);");
        
        content = content.substring(0, oldScrollStart) + replaceStateStr + "  " + content.substring(oldScrollEnd);
    }
}

const oldSectionHtml = `<div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 relative">
<div>
<h2 className="font-architectural text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight mb-2">
          Trending Now
        </h2>
</div>
<div className="flex gap-2">
  <button onClick={() => scroll('left')} className="w-10 h-10 flex items-center justify-center border border-black/20 rounded-full hover:bg-black hover:text-white transition-colors" aria-label="Scroll left">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
  </button>
  <button onClick={() => scroll('right')} className="w-10 h-10 flex items-center justify-center border border-black/20 rounded-full hover:bg-black hover:text-white transition-colors" aria-label="Scroll right">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
  </button>
</div>
</div>

<div 
  ref={scrollContainerRef}
  className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4" 
  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
>
  <style>{".flex::-webkit-scrollbar { display: none; }"}</style>
  {trendingProducts.map((product, idx) => (
    <Link key={idx} to="/product" state={{ name: product.name, price: product.price, image: product.image }} className="flex flex-col cursor-pointer group min-w-[280px] sm:min-w-[300px] snap-start">
      <div className="w-full aspect-square bg-[#F4F4F4] overflow-hidden flex items-center justify-center p-6 relative">
        <img alt={product.name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" src={product.image} />
        <button className="absolute bottom-3 left-3 right-3 bg-brand-black text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2" type="button" onClick={(e) => e.preventDefault()}>
          Add to Cart
        </button>
      </div>
      <p className="text-sm text-brand-charcoal font-normal leading-snug mt-3 px-1">{product.name}</p>
      <p className="text-[13px] text-black font-medium mt-0.5 px-1"><PriceDisplay amount={product.price} /></p>
    </Link>
  ))}
</div>`;

const newSectionHtml = `<div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 relative">
<div>
<h2 className="font-architectural text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight mb-2">
          Trending Now
        </h2>
</div>
</div>

<div className="relative group -mx-4 px-4 sm:mx-0 sm:px-0">
  {canScrollLeft && (
    <button onClick={() => scroll('left')} className="absolute left-[-20px] lg:left-[-24px] top-[40%] -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white shadow-lg border border-black/10 rounded-full hover:bg-black hover:text-white transition-colors" aria-label="Scroll left">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
    </button>
  )}
  
  <div 
    ref={scrollContainerRef}
    onScroll={checkScroll}
    className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4" 
    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
  >
    <style>{\`.flex::-webkit-scrollbar { display: none; }\`}</style>
    {trendingProducts.map((product, idx) => (
      <Link key={idx} to="/product" state={{ name: product.name, price: product.price, image: product.image }} className="flex flex-col cursor-pointer group min-w-[280px] sm:min-w-[300px] snap-start">
        <div className="w-full aspect-square bg-[#F4F4F4] overflow-hidden flex items-center justify-center p-6 relative">
          <img alt={product.name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" src={product.image} />
          <button className="absolute bottom-3 left-3 right-3 bg-brand-black text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2" type="button" onClick={(e) => e.preventDefault()}>
            Add to Cart
          </button>
        </div>
        <p className="text-sm text-brand-charcoal font-normal leading-snug mt-3 px-1">{product.name}</p>
        <p className="text-[13px] text-black font-medium mt-0.5 px-1"><PriceDisplay amount={product.price} /></p>
      </Link>
    ))}
  </div>

  {canScrollRight && (
    <button onClick={() => scroll('right')} className="absolute right-[-20px] lg:right-[-24px] top-[40%] -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white shadow-lg border border-black/10 rounded-full hover:bg-black hover:text-white transition-colors" aria-label="Scroll right">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
    </button>
  )}
</div>`;

content = content.replace(oldSectionHtml, newSectionHtml);

fs.writeFileSync(homePath, content, 'utf8');
console.log("Updated Home.jsx");
