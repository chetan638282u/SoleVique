import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import TopBarFilter from '../components/TopBarFilter';
import { products as globalProducts } from '../data/products';
import PriceDisplay from '../components/PriceDisplay';

export default function Bestsellers() {
  const { addToCart } = useCart();
  const initialProducts = React.useMemo(() => [...(globalProducts.slice(0, 8))].sort((a, b) => ((a.name.charCodeAt(0) * 8 + a.price) % 97) - ((b.name.charCodeAt(0) * 8 + b.price) % 97)), []);
  const [filteredProducts, setFilteredProducts] = useState(() => [...initialProducts].sort((a, b) => ((a.name.charCodeAt(0) * 8 + a.price) % 97) - ((b.name.charCodeAt(0) * 8 + b.price) % 97)));


  return (
    <>
      <div className="flex flex-col w-full">


<section className="w-full bg-white pt-2 pb-4">
<div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop">
<h1 className="font-architectural text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight uppercase">
            Bestsellers
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
  <ProductCard key={idx} product={product} className="" />
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
