import React, { useRef, useState, useEffect } from 'react';
import PriceDisplay from '../components/PriceDisplay';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import HeroSlideshow from '../components/HeroSlideshow'

export default function Home() {
  const { addToCart } = useCart();
  
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
  const trendingProducts = products.slice(0, 7);

  return (
    <>
      

<HeroSlideshow />


<aside className="w-full bg-brand-ember-deep text-white py-2 px-4 relative overflow-hidden shadow-inner" data-purpose="promotional-ribbon">
<div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2 text-center">

<div className="flex flex-col items-center justify-center w-full">
<p className="text-sm font-semibold tracking-wide text-center w-full">
Up to 30% Off Selected New Arrivals
</p>
</div>

<div className="flex items-center gap-3">
<Link className="bg-white text-brand-ember-deep bg-neutral-100 px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition- inline-flex items-center gap-1.5" to="/sale">
<span className="">Shop the Sale</span>
<span className="">→</span>
</Link>
</div>
</div>
</aside>


<section className="bg-white border-b border-black/10 py-16 lg:py-20" data-purpose="trending-products">
<div className="w-full mx-auto px-[15px]">

<div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 relative">
<div>
<h2 className="font-architectural text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight mb-2">
          Trending Now
        </h2>
</div>
</div>

<div className="relative">
  {canScrollLeft && (
    <button onClick={() => scroll('left')} className="absolute left-[-20px] lg:left-[-24px] top-[40%] -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white shadow-lg border border-black/10 rounded-full hover:bg-black hover:text-white transition-colors" aria-label="Scroll left">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
    </button>
  )}
  
  <div 
    ref={scrollContainerRef}
    onScroll={checkScroll}
    className="flex gap-[10px] overflow-x-auto snap-x snap-mandatory pb-4" 
    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
  >
    <style>{`.flex::-webkit-scrollbar { display: none; }`}</style>
    {trendingProducts.map((product, idx) => (
      <Link key={idx} to={`/product?id=${encodeURIComponent(product.name)}`} state={{ name: product.name, price: product.price, image: product.image }} className="flex flex-col cursor-pointer group min-w-[calc(50%-5px)] md:min-w-[340px] lg:min-w-[400px] snap-start">
        <div className="w-full aspect-square bg-[#F4F4F4] overflow-hidden flex items-center justify-center p-2 md:p-6 relative">
          <img alt={product.name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none" src={product.image} />
          <button className="absolute bottom-3 left-3 right-3 bg-brand-black text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs opacity-0 lg:group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 delay-[2000ms] lg:group-hover:delay-0 group-active:delay-0 focus:opacity-100 focus:delay-0 flex items-center justify-center gap-2" type="button" onClick={(e) => { e.preventDefault(); addToCart(product, 1, product.sizes?.[0] || '8'); }}>Add to Bag</button>
        </div>
        <p className="text-sm text-brand-charcoal font-normal leading-snug mt-3 px-1 truncate">{product.name}</p>
        <p className="text-[13px] text-black font-medium mt-0.5 px-1"><PriceDisplay amount={product.price} /></p>
      </Link>
    ))}
  </div>

  {canScrollRight && (
    <button onClick={() => scroll('right')} className="absolute right-[-20px] lg:right-[-24px] top-[40%] -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white shadow-lg border border-black/10 rounded-full hover:bg-black hover:text-white transition-colors" aria-label="Scroll right">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
    </button>
  )}
</div>

<div className="mt-12 flex justify-center">
  <Link className="px-8 py-3 bg-brand-black text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-brand-ember transition-colors" to="/bestsellers">
    View All Products
  </Link>
</div>

</div>
</section><section className="bg-[#F9F8F6] border-b border-black/10 py-16 lg:py-20 relative overflow-hidden" data-purpose="editorial-anthology">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center max-w-3xl mx-auto mb-12">
<h2 className="font-architectural text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight mb-3">THE SOLEVIQUE ANTHOLOGY</h2>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
<Link to="/women" className="lg:col-span-7 group relative rounded-2xl overflow-hidden border border-black/10 bg-white min-h-[500px] lg:min-h-[580px] flex flex-col justify-between block">
<div className="absolute inset-0 z-0 overflow-hidden">
<img alt="Women's Footwear Campaign" className="w-full h-full object-cover" src="/images/women_campaign.png" />
<div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent"></div>
</div>
<div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full">
<div></div>
<div className="pt-24">
<h3 className="font-architectural text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2">WOMEN</h3>
</div>
</div>
</Link>
<div className="lg:col-span-5 flex flex-col gap-6">
<Link to="/bestsellers" className="group relative rounded-2xl overflow-hidden border border-black/10 bg-brand-charcoal min-h-[270px] lg:min-h-[280px] flex-1 flex flex-col justify-between block">
<div className="absolute inset-0 z-0 overflow-hidden">
<img alt="Bestsellers Footwear Campaign" className="w-full h-full object-cover" src="/images/bestsellers_campaign.png" />
<div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent"></div>
</div>
<div className="relative z-10 p-6 flex flex-col justify-between h-full">
<div></div>
<div className="pt-12">
<h3 className="font-architectural text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">ALL PRODUCTS</h3>
<p className="text-xs text-neutral-300 font-medium">Timeless forms refined season after season.</p>
</div>
</div>
</Link>
<Link to="/running" className="group relative rounded-2xl overflow-hidden border border-black/10 bg-brand-charcoal min-h-[270px] lg:min-h-[280px] flex-1 flex flex-col justify-between block">
<div className="absolute inset-0 z-0 overflow-hidden">
<img alt="Men's Footwear Campaign" className="w-full h-full object-cover" src="/images/men_campaign.png" />
<div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent"></div>
</div>
<div className="relative z-10 p-6 flex flex-col justify-between h-full">
<div></div>
<div className="pt-12">
<h3 className="font-architectural text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">MEN</h3>
<p className="text-xs text-neutral-300 font-medium">Architectural tailoring crafted in Marche.</p>
</div>
</div>
</Link>
</div>
</div>
</div>
</section><section className="bg-[#F9F8F6] border-b border-black/10 py-16 lg:py-20" data-purpose="shop-by-category">
<div className="w-full mx-auto px-[15px]">
  <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
    <div>
      <h2 className="font-architectural text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-black tracking-tight">Shop by Category</h2>
    </div>
  </div>
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[10px]">
    <Link className="flex flex-col cursor-pointer group" to="/running">
      <div className="w-full aspect-[3/4] bg-[#F4F4F4] overflow-hidden flex items-center justify-center relative transition-colors">
        <img alt="Running Category" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" src="/images/categories/running.png" />
      </div>
      <p className="text-sm text-brand-charcoal font-semibold leading-snug mt-3 px-1 text-center capitalize">Running</p>
    </Link>
    <Link className="flex flex-col cursor-pointer group" to="/casual">
      <div className="w-full aspect-[3/4] bg-[#F4F4F4] overflow-hidden flex items-center justify-center relative transition-colors">
        <img alt="Casual Category" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" src="/images/categories/casual.png" />
      </div>
      <p className="text-sm text-brand-charcoal font-semibold leading-snug mt-3 px-1 text-center capitalize">Casual</p>
    </Link>
    <Link className="flex flex-col cursor-pointer group" to="/formal">
      <div className="w-full aspect-[3/4] bg-[#F4F4F4] overflow-hidden flex items-center justify-center relative transition-colors">
        <img alt="Formal Category" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" src="/images/categories/formal.png" />
      </div>
      <p className="text-sm text-brand-charcoal font-semibold leading-snug mt-3 px-1 text-center capitalize">Formal</p>
    </Link>
    <Link className="flex flex-col cursor-pointer group" to="/sandals">
      <div className="w-full aspect-[3/4] bg-[#F4F4F4] overflow-hidden flex items-center justify-center relative transition-colors">
        <img alt="Sandals Category" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" src="/images/categories/sandals.png" />
      </div>
      <p className="text-sm text-brand-charcoal font-semibold leading-snug mt-3 px-1 text-center capitalize">Sandals</p>
    </Link>
    <Link className="flex flex-col cursor-pointer group col-span-2 sm:col-span-1 lg:col-span-1" to="/sports">
      <div className="w-full aspect-[3/4] bg-[#F4F4F4] overflow-hidden flex items-center justify-center relative transition-colors">
        <img alt="Sports Category" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" src="/images/categories/sports.png" />
      </div>
      <p className="text-sm text-brand-charcoal font-semibold leading-snug mt-3 px-1 text-center capitalize">Sports</p>
    </Link>
  </div>
</div>
</section>


<section className="bg-white border-b border-black/10 py-16 lg:py-20" data-purpose="testimonials">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center max-w-3xl mx-auto mb-14">

<h2 className="font-architectural text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight mb-3">
        What Our Customers Say
      </h2>
<p className="text-base text-brand-charcoal/70">
        Over 2,400+ discerning individuals walk in SoleVique daily.
      </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

<div className="bg-white rounded-2xl border border-black/10 p-8 flex flex-col justify-between hover: duration-200">
<div>
<div className="flex items-center gap-1 text-yellow-500 mb-4">
<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
</div>
<p className="text-sm sm:text-base text-brand-black leading-relaxed font-medium mb-6">
            “The Arch-Series 01 is hands down the most comfortable sneaker I've ever owned. Clean aesthetics that seamlessly transition from studio meetings to 10k walk days.”
          </p>
</div>
<div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
<div className="w-10 h-10 rounded-full bg-brand-charcoal text-white font-bold text-xs flex items-center justify-center tracking-wider">
            DV
          </div>
<div>
<span className="block font-bold text-sm text-brand-black">Devrath Verma</span>
</div>
</div>
</div>

<div className="bg-white rounded-2xl border border-black/10 p-8 flex flex-col justify-between hover: duration-200">
<div>
<div className="flex items-center gap-1 text-yellow-500 mb-4">
<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
<svg className="w-4 h-4 fill-neutral-300" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
</div>
<p className="text-sm sm:text-base text-brand-black leading-relaxed font-medium mb-6">
            “Remarkable Italian leather craftsmanship. The zero-drop cushioning eliminated my lower back fatigue entirely. Worth every single penny.”
          </p>
</div>
<div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
<div className="w-10 h-10 rounded-full bg-brand-ember text-white font-bold text-xs flex items-center justify-center tracking-wider">
            AP
          </div>
<div>
<span className="block font-bold text-sm text-brand-black">Arjun Patel</span>
</div>
</div>
</div>

<div className="bg-white rounded-2xl border border-black/10 p-8 flex flex-col justify-between hover: duration-200">
<div>
<div className="flex items-center gap-1 text-yellow-500 mb-4">
<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
</div>
<p className="text-sm sm:text-base text-brand-black leading-relaxed font-medium mb-6">
            “Minimalist perfection. The leather smells divine, the stitching is surgical, and after 4 months of daily wear, they look even better.”
          </p>
</div>
<div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
<div className="w-10 h-10 rounded-full bg-neutral-200 text-brand-charcoal font-bold text-xs flex items-center justify-center tracking-wider">
            AS
          </div>
<div>
<span className="block font-bold text-sm text-brand-black">Aanya Singhania</span>
</div>
</div>
</div>
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


<footer className="bg-brand-charcoal text-white pt-16 pb-12 border-t border-neutral-800" data-purpose="global-footer">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-14">

<div className="lg:col-span-2 flex flex-col justify-between">
<div>
<div className="flex items-center gap-3 mb-4">
<div className="w-8 h-8 bg-brand-ember flex items-center justify-center rounded-lg text-white font-black text-lg tracking-tighter">
              SV
            </div>
<span className="font-architectural text-2xl tracking-tighter text-white">SoleVique</span>
</div>
<p className="text-sm text-neutral-400 leading-relaxed max-w-sm mb-6">
            Architecturally sculpted footwear engineered in Civitanova Marche, Italy for all-day cadence and quiet luxury.
          </p>
</div>

<div className="flex items-center gap-4 text-neutral-400">
<Link aria-label="Instagram" className="text-white transition" to="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg></Link>
<Link aria-label="X / Twitter" className="text-white transition" to="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></Link>
<Link aria-label="Pinterest" className="text-white transition" to="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"></path></svg></Link>
<Link aria-label="LinkedIn" className="text-white transition" to="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg></Link>
</div>
</div>

<div>
<h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300 mb-4">Shop</h4>
<ul className="space-y-2.5 text-sm text-neutral-400 font-medium">
<li className=""><Link className="text-white transition" to="/men">Men's Collection</Link></li>
<li className=""><Link className="text-white transition" to="/women">Women's Collection</Link></li>
<li className=""><Link className="text-white transition" to="#new">New Arrivals</Link></li>
<li className=""><Link className="text-white transition" to="#bestsellers">Best Sellers</Link></li>
<li className=""><Link className="text-white transition" to="#archival">Archival Series</Link></li>
<li className=""><Link className="text-white transition" to="#gift-cards">Gift Cards</Link></li>
</ul>
</div>

<div>
<h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300 mb-4">Company</h4>
<ul className="space-y-2.5 text-sm text-neutral-400 font-medium">
<li className=""><Link className="text-white transition" to="#story">Our Story</Link></li>
<li className=""><Link className="text-white transition" to="#atelier">Civitanova Atelier</Link></li>
<li className=""><Link className="text-white transition" to="#sustainability">Sustainable Hides</Link></li>
<li className=""><Link className="text-white transition" to="#materials">Materials &amp; Ergonomics</Link></li>
<li className=""><Link className="text-white transition" to="#press">Press</Link></li>
</ul>
</div>

<div>
<h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300 mb-4">Support</h4>
<ul className="space-y-2.5 text-sm text-neutral-400 font-medium">
<li className=""><Link className="text-white transition" to="#track">Track Order</Link></li>
<li className=""><Link className="text-white transition" to="#shipping">Shipping &amp; Delivery</Link></li>
<li className=""><Link className="text-white transition" to="#returns">Returns &amp; Exchanges</Link></li>
<li className=""><Link className="text-white transition" to="#size-guide">Size Guide</Link></li>
<li className=""><Link className="text-white transition" to="#shoe-care">Shoe Care</Link></li>
</ul>
</div>

<div>
<h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300 mb-4">Legal</h4>
<ul className="space-y-2.5 text-sm text-neutral-400 font-medium">
<li className=""><Link className="text-white transition" to="#privacy">Privacy Policy</Link></li>
<li className=""><Link className="text-white transition" to="#terms">Terms of Service</Link></li>
<li className=""><Link className="text-white transition" to="#accessibility">Accessibility</Link></li>
<li className=""><Link className="text-white transition" to="#cookies">Cookie Settings</Link></li>
</ul>
</div>
</div>

<div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
<div className="">
        © 2025 SoleVique Atelier S.r.l. All rights reserved.
      </div>
<div className="flex items-center gap-6">
<div className="flex items-center gap-2 text-neutral-300">
<span className="px-2 py-1 bg-neutral-800 rounded font-semibold text-[10px] tracking-wide">VISA</span>
<span className="px-2 py-1 bg-neutral-800 rounded font-semibold text-[10px] tracking-wide">MC</span>
<span className="px-2 py-1 bg-neutral-800 rounded font-semibold text-[10px] tracking-wide">AMEX</span>
<span className="px-2 py-1 bg-neutral-800 rounded font-semibold text-[10px] tracking-wide">APPLE PAY</span>
</div>
<div className="h-4 w-px bg-neutral-800 hidden sm:block"></div>
<button className="text-white transition flex items-center gap-1.5 font-medium" type="button">
<span className="">Global // USD $</span>
</button>
</div>
</div>
</div>
</footer>




    </>
  );
}
