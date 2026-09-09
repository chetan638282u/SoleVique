const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, '..', 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(homePath, 'utf8');

// We need to add useRef to imports if not present. Home.jsx only has:
// import React from 'react';
// import PriceDisplay from '../components/PriceDisplay';
// import { Link } from 'react-router-dom';
// import HeroSlideshow from '../components/HeroSlideshow'
// We also need to import products:
// import { products } from '../data/products';

if (!content.includes("import React, { useRef }")) {
    content = content.replace("import React from 'react';", "import React, { useRef } from 'react';");
}
if (!content.includes("import { products }")) {
    content = content.replace("import { Link } from 'react-router-dom';", "import { Link } from 'react-router-dom';\nimport { products } from '../data/products';");
}

// Update the component signature if needed, but it's just `export default function Home() {`
// Add the scroll function inside Home component
const homeFnMatch = content.match(/export default function Home\(\) \{/);
if (homeFnMatch) {
    if (!content.includes("const scrollContainerRef = useRef(null);")) {
        const insertAfter = homeFnMatch[0] + "\n  const scrollContainerRef = useRef(null);\n  const scroll = (direction) => {\n    if (scrollContainerRef.current) {\n      const { current } = scrollContainerRef;\n      const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;\n      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });\n    }\n  };\n  const trendingProducts = products.slice(0, 7);\n";
        content = content.replace(homeFnMatch[0], insertAfter);
    }
}

// Replace the entire Trending Now section
const startStr = '<section className="bg-white border-b border-black/10 py-16 lg:py-20" data-purpose="trending-products">';
const startIdx = content.indexOf(startStr);
const endIdx = content.indexOf('</section>', startIdx) + '</section>'.length;

const newSection = `
<section className="bg-white border-b border-black/10 py-16 lg:py-20" data-purpose="trending-products">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 relative">
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
</div>

<div className="mt-12 flex justify-center">
  <Link className="px-8 py-3 bg-brand-black text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-brand-ember transition-colors" to="/bestsellers">
    View All Products
  </Link>
</div>

</div>
</section>`.trim();

content = content.substring(0, startIdx) + newSection + content.substring(endIdx);

// Also fix BESTSELLPSS -> ALL PRODUCTS
content = content.replace('BESTSELLPSS', 'ALL PRODUCTS');

fs.writeFileSync(homePath, content, 'utf8');
console.log("Updated Home.jsx");
