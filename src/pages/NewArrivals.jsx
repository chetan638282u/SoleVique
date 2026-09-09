import React, { useState, useMemo } from 'react';
import PriceDisplay from '../components/PriceDisplay';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import TopBarFilter from '../components/TopBarFilter';
import { products as globalProducts } from '../data/products';

export default function NewArrivals() {
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  
  const initialProducts = useMemo(() => globalProducts.filter(p => ["Tuscan Penny Loafer", "Architectural Cross Slide", "Arch-Court Sneaker 01", "Verona Brass Buckle Clog Mule"].includes(p.name)), []);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);


  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full">


<section className="w-full bg-white pt-2 pb-4">
<div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop">
<h1 className="font-architectural text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight uppercase">
            New Arrivals
          </h1>
</div>
</section>

<TopBarFilter allProducts={initialProducts} onFilterChange={setFilteredProducts} />




<section className="w-full mx-auto px-[15px] pb-12 pt-2">
<div className="flex flex-col w-full items-start">

<main className="w-full space-y-space-2xl">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10px]">
  {currentProducts.map((product, idx) => (
    <Link key={idx} to="/product" state={{ name: product.name, price: product.price, image: product.image }} className="flex flex-col cursor-pointer group">
      <div className="w-full aspect-square bg-[#F4F4F4] overflow-hidden flex items-center justify-center p-6 relative">
        <img alt={product.name} className="w-full h-full object-contain" src={product.image} />
        <button className="absolute bottom-3 left-3 right-3 bg-brand-black text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" type="button" onClick={(e) => { e.preventDefault(); addToCart(product, 1, product.sizes?.[0] || '8'); }}>Add to Bag</button>
      </div>
      <p className="text-sm text-brand-charcoal font-normal leading-snug mt-3 px-1">{product.name}</p>
      <p className="text-[13px] text-black font-medium mt-0.5 px-1"><PriceDisplay amount={product.price} /></p>
    </Link>
  ))}
</div>

<div className="flex flex-col items-center justify-center space-y-space-lg pt-space-xl">

<div className="w-full max-w-sm text-center space-y-space-xs">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Showing {currentProducts.length} of {filteredProducts.length} products</span>
<div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-secondary rounded-full transition-all" style={{ width: `${(currentPage / totalPages) * 100}%` }}></div>
</div>
</div>

<nav aria-label="Catalog Pagination" className="flex items-center gap-space-2xs pt-space-xs">
<button 
  onClick={() => handlePageChange(currentPage - 1)}
  disabled={currentPage === 1}
  aria-label="Previous Page" 
  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${currentPage === 1 ? 'text-on-surface-variant/40 cursor-not-allowed' : 'text-on-surface hover:bg-surface-container-lowest'}`}>
<span className="material-symbols-outlined text-[20px]">chevron_left</span>
</button>

{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
  <button 
    key={page}
    onClick={() => handlePageChange(page)}
    className={`w-10 h-10 rounded-lg font-label-sm text-label-sm font-semibold transition-colors ${currentPage === page ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface hover:bg-surface-container-lowest'}`}>
    {page}
  </button>
))}

<button 
  onClick={() => handlePageChange(currentPage + 1)}
  disabled={currentPage === totalPages}
  aria-label="Next Page" 
  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${currentPage === totalPages ? 'text-on-surface-variant/40 cursor-not-allowed' : 'text-on-surface hover:bg-surface-container-lowest'}`}>
<span className="material-symbols-outlined text-[20px]">chevron_right</span>
</button>
</nav>
</div>
</main>
</div>
</section>

<section className="bg-brand-ember text-white px-4 relative overflow-hidden py-16" data-purpose="newsletter-strip">
<div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
<div className="max-w-xl text-center lg:text-left">

<h3   className="font-architectural text-2xl sm:text-3xl font-black tracking-tight mb-2">
        Get 10% Off On Your First Order
      </h3>
<p className="text-white/90 text-sm sm:text-base leading-relaxed">
        Join the SoleVique syndicate for private batch releases, archival drops, and footwear care guides.
      </p>
</div>
<div className="w-full max-w-md">
<form className="flex flex-col sm:flex-row gap-2.5" >
<input aria-label="Email Address" className="flex-1 bg-white text-brand-black placeholder:text-neutral-400 px-4 py-3 rounded-xl text-sm border-0 focus:ring-2 focus:ring-brand-black" placeholder="Enter your email address..." required="" type="email" />
<button className="bg-brand-black bg-brand-charcoal text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-xl transition duration-200 whitespace-nowrap" type="submit">
          Claim 10% Off
        </button>
</form>
<p className="text-[11px] text-white/75 mt-2 text-center sm:text-left">
        Zero spam. Unsubscribe anytime.
      </p>
</div>
</div>
</section>


</div>
    </>
  );
}
