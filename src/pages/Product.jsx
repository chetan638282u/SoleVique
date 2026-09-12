import React from 'react';
import PriceDisplay from '../components/PriceDisplay';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { products } from '../data/products';

export default function Product() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;
  
  const [selectedSize, setSelectedSize] = React.useState('8');
  const [quantity, setQuantity] = React.useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = React.useState(false);
  const [isDescOpen, setIsDescOpen] = React.useState(false);

  const { addToCart } = useCart();

  // If navigated directly without a product, redirect to home
  React.useEffect(() => {
    if (!product) {
      navigate('/', { replace: true });
    }
  }, [product, navigate]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (!product) return null;

  return (
    <>
      <div className="flex flex-col bg-white min-h-screen w-full max-w-full">
        <section className="max-w-[1360px] w-full mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 relative lg:sticky lg:top-[136px]">

<div className="flex md:flex-col gap-space-xs shrink-0 overflow-x-auto md:overflow-visible pb-1 md:pb-0" id="thumbnail-strip">
<button className="thumb-btn relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-surface-container-lowest p-1 shadow-sm transition-all duration-200 border-2 border-brand-black"  type="button">
<img alt={product.name} className="w-full h-full object-contain mix-blend-multiply pointer-events-none select-none" src={product.image} />
<span className="sr-only">View Lateral Profile</span>
</button>
</div>

<div className="flex-1 relative bg-[#F4F4F4] overflow-hidden aspect-square flex items-center justify-center p-space-md group">

<div className="absolute inset-0 bg-gradient-to-tr from-surface-container-low/80 via-transparent to-surface-bright/50 pointer-events-none"></div>

<div className="absolute top-space-md left-space-md flex flex-col gap-1.5 z-10">
</div>

<div 
  className="relative w-full h-full flex items-center justify-center" 
  id="main-gallery-viewport"
>
<img 
  alt={product.name} 
  className="w-full h-full object-contain mix-blend-multiply pointer-events-none select-none" 
  id="main-product-img" 
  src={product.image}  
/>
</div>
</div>
</div>

<div className="lg:col-span-5 flex flex-col gap-4 font-sans">

  {/* Brand Header & Title */}
  <div className="flex flex-col gap-1">
    <span className="font-bold text-[10px] text-neutral-500 uppercase tracking-widest">
      SOLEVIQUE | PREMIUM FOOTWEAR
    </span>
    <h1 className="font-architectural text-4xl text-brand-black tracking-wide leading-tight mb-2">
      {product.name}
    </h1>
  </div>

  {/* Price Block */}
  <div className="flex items-center gap-4 border-b border-neutral-200 pb-4">
    <span className="text-xl line-through text-neutral-500 font-bold decoration-2">
      <PriceDisplay amount={product.originalPrice || Math.round(product.price * 1.2)} />
    </span>
    <span className="text-2xl text-brand-black font-black">
      <PriceDisplay amount={product.price} />
    </span>
    <span className="px-3 py-1 bg-brand-black text-white text-[10px] uppercase tracking-wider font-bold rounded-full">
      {product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 17}% off
    </span>
  </div>

  <div className="text-sm text-neutral-600 mb-2">
    Tax included. <Link to="/shipping" className="underline hover:text-brand-black">Shipping</Link> calculated at checkout.
  </div>

  {/* Color Selection */}
  <div className="flex items-center gap-2 text-sm">
    <span className="text-neutral-500">Color:</span>
    <span className="text-brand-black">Standard Edition</span>
  </div>

  {/* Size Selection */}
  <div className="flex flex-col gap-2">
    <span className="text-sm text-neutral-500 mb-1">Size</span>
    <div className="flex flex-wrap gap-2">
      {['6', '7', '8', '9', '10'].map(size => (
        <button 
          key={size}
          onClick={() => setSelectedSize(size)}
          type="button"
          className={`w-14 h-12 flex items-center justify-center border text-sm transition-colors ${
            selectedSize === size 
            ? 'bg-brand-black text-white border-brand-black' 
            : 'bg-white text-brand-black border-neutral-300 hover:border-neutral-500'
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  </div>

  {/* Quantity */}
  <div className="flex flex-col gap-2">
    <span className="text-sm text-neutral-500 mb-1">Quantity</span>
    <div className="flex items-center border border-neutral-400 w-32 h-12">
      <button 
        type="button"
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        className="w-10 h-full flex items-center justify-center text-neutral-500 hover:text-brand-black transition-colors"
      >
        <span className="material-symbols-outlined text-[16px]">remove</span>
      </button>
      <span className="flex-1 text-center text-brand-black text-sm">{quantity}</span>
      <button 
        type="button"
        onClick={() => setQuantity(quantity + 1)}
        className="w-10 h-full flex items-center justify-center text-neutral-500 hover:text-brand-black transition-colors"
      >
        <span className="material-symbols-outlined text-[16px]">add</span>
      </button>
    </div>
  </div>

  {/* Actions */}
  <div className="flex flex-col gap-3">
    <button 
      onClick={() => addToCart(product, quantity, selectedSize)}
      type="button"
      className="w-full h-14 border border-brand-black bg-white text-brand-black font-normal text-base hover:bg-neutral-50 transition-colors"
    >
      Add to cart
    </button>
    <button 
      onClick={() => {
        addToCart(product, quantity, selectedSize);
        navigate('/cart');
      }}
      type="button"
      className="w-full h-14 bg-brand-black text-white font-normal text-base hover:bg-neutral-800 transition-colors"
    >
      Buy it now
    </button>
  </div>

  {/* Accordion */}
  <div className="flex flex-col gap-1 pt-6 mt-4 border-t border-neutral-200">
    <div className="border-b border-neutral-200">
      <button 
        onClick={() => setIsDescOpen(!isDescOpen)}
        className="w-full py-4 flex items-center justify-between text-left text-brand-black"  
        type="button"
      >
        <span className="text-base font-normal">Description</span>
        <span className={`material-symbols-outlined text-[20px] transform transition-transform ${isDescOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      
      {isDescOpen && (
        <div className="pb-6 text-sm text-neutral-600 flex flex-col gap-4">
          <p>
            The <strong>{product.name}</strong> strips footwear down to its essential geometry. Cut from Grade-A full-grain Tuscan calfskin that softens progressively with each wear, this silhouette is built around our proprietary zero-drop footbed for natural anatomical stabilization.
          </p>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>Tanned in Santa Croce sull'Arno using natural vegetable oils</li>
            <li>Stitched 360-degree Margom rubber cupsole for decades of wear</li>
            <li>Reinforced counter with internal micro-suede slip prevention</li>
            <li>Finished with blind-stamped gold foil Civitanova archive numbering</li>
          </ul>
        </div>
      )}
    </div>
  </div>

</div>

</div>
</section>

<section className="max-w-[1360px] w-full mx-auto px-margin-desktop py-space-xl">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
          You May Also Like
        </h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Handcrafted silhouettes engineered with matching zero-drop ergonomics and artisanal leathers.
        </p>
</div>
<div className="flex items-center gap-space-xs mt-space-md md:mt-0">
<Link className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider flex items-center gap-1 hover:text-secondary transition-colors" data-path="collections" to="#">
          Explore Entire Archive <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</Link>
</div>
</div>

<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
{products.filter(p => p.name !== product.name).slice(0, 4).map((relatedProduct, idx) => (
  <ProductCard key={idx} product={relatedProduct} className="" />
))}
</div>
</section>

{isSizeGuideOpen && (
<div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4" id="size-guide-modal">
<div className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-space-xl shadow-2xl relative">
<div className="flex items-center justify-between mb-space-md">
<h3   className="font-headline-md text-headline-md text-on-surface font-bold">Indian Size Guide</h3>
<button onClick={() => setIsSizeGuideOpen(false)} className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-secondary"  type="button">
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
        SoleVique sneakers run true to standard Indian sizing.
      </p>
<div className="overflow-x-auto">
<table className="w-full text-left font-label-md text-label-md">
<thead className="bg-surface-container text-on-surface uppercase text-[11px] tracking-wider">
<tr>
<th className="p-2.5">UK/India</th>
<th className="p-2.5">Euro</th>
<th className="p-2.5">US</th>
<th className="p-2.5">Foot Length (CM)</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container text-on-surface">
<tr><td className="p-2.5 font-bold">6</td><td className="p-2.5">40</td><td className="p-2.5">7</td><td className="p-2.5">24.6 cm</td></tr>
<tr><td className="p-2.5 font-bold">7</td><td className="p-2.5">41</td><td className="p-2.5">8</td><td className="p-2.5">25.4 cm</td></tr>
<tr><td className="p-2.5 font-bold">8</td><td className="p-2.5">42</td><td className="p-2.5">9</td><td className="p-2.5">26.2 cm</td></tr>
<tr><td className="p-2.5 font-bold">9</td><td className="p-2.5">43</td><td className="p-2.5">10</td><td className="p-2.5">27.1 cm</td></tr>
<tr><td className="p-2.5 font-bold">10</td><td className="p-2.5">44</td><td className="p-2.5">11</td><td className="p-2.5">27.9 cm</td></tr>
<tr><td className="p-2.5 font-bold">11</td><td className="p-2.5">45</td><td className="p-2.5">12</td><td className="p-2.5">28.8 cm</td></tr>
<tr><td className="p-2.5 font-bold">12</td><td className="p-2.5">46</td><td className="p-2.5">13</td><td className="p-2.5">29.6 cm</td></tr>
</tbody>
</table>
</div>
<div className="mt-space-lg flex justify-end">
<button onClick={() => setIsSizeGuideOpen(false)} className="px-space-lg py-2.5 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider font-bold rounded-lg hover:bg-neutral-800 transition-colors"  type="button">
          Got It
        </button>
</div>
</div>
</div>
)}

<div className="fixed bottom-6 right-6 z-50 transform transition-all pointer-events-none bg-inverse-surface text-inverse-on-surface px-space-lg py-space-md rounded-xl shadow-2xl flex items-center gap-space-md translate-y-24" id="cart-toast">
<span className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">done</span>
</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold" id="toast-title">Saved to Wishlist</span>
<span className="font-body-md text-[12px] opacity-80" id="toast-desc">Added to your personal atelier curation.</span>
</div>
</div>

</div>
    </>
  );
}
