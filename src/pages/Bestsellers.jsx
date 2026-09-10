import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import TopBarFilter from '../components/TopBarFilter';
import { products as globalProducts } from '../data/products';
import PriceDisplay from '../components/PriceDisplay';

export default function Bestsellers() {
  const { addToCart } = useCart();
  const initialProducts = globalProducts;
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);


  return (
    <>
      <div className="flex flex-col w-full">


<section className="w-full bg-white pt-2 pb-4">
<div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop">
<h1 className="font-architectural text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight uppercase">
            All Products
          </h1>
</div>
</section>

<TopBarFilter allProducts={initialProducts} onFilterChange={setFilteredProducts} />


<section className="w-full bg-white pb-12 pt-2">
<div className="w-full mx-auto px-[15px]">
<div className="flex flex-col w-full items-start">

<main className="w-full">
<div className="grid grid-cols-2 lg:grid-cols-4 gap-[10px]">
{filteredProducts.map((product, idx) => (
  <Link key={idx} to="/product" state={{ name: product.name, price: product.price, image: product.image, from: '/bestsellers' }} className="flex flex-col cursor-pointer group">
    <div className="w-full aspect-square bg-[#F4F4F4] overflow-hidden flex items-center justify-center p-6 relative">
      <img alt={product.name} className="w-full h-full object-contain" src={product.image} />
      <button className="absolute bottom-3 left-3 right-3 bg-brand-black text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 opacity-0 lg:group-hover:opacity-100 active:opacity-100 transition-opacity duration-300" type="button" onClick={(e) => { e.preventDefault(); addToCart(product, 1, product.sizes?.[0] || '8'); }}>Add to Bag</button>
    </div>
    <p className="text-sm text-brand-charcoal font-normal leading-snug mt-3 px-1 truncate">{product.name}</p>
    <p className="text-[13px] text-black font-medium mt-0.5 px-1"><PriceDisplay amount={product.price} /></p>
  </Link>
))}
</div>


</main>
</div>
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
