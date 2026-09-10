import React from 'react';
import PriceDisplay from '../components/PriceDisplay';
import { useCart } from '../context/CartContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Product() {
  const location = useLocation();
  const product = location.state || {
    name: 'Arch-Series 01 Court Minimaliste',
    price: 215,
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=800&auto=format&fit=crop'
  };

  const [selectedSize, setSelectedSize] = React.useState('8');
  const [quantity, setQuantity] = React.useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = React.useState(false);
  const [isDescOpen, setIsDescOpen] = React.useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <div className="flex flex-col w-full">

<section className="max-w-[1360px] w-full mx-auto px-margin-desktop py-space-xl">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">

<div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-space-sm relative lg:sticky top-[136px]">

<div className="flex md:flex-col gap-space-xs shrink-0 overflow-x-auto md:overflow-visible pb-1 md:pb-0" id="thumbnail-strip">
<button className="thumb-btn relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-surface-container-lowest p-1 shadow-sm transition-all duration-200 ring-2 ring-primary ring-offset-2 ring-offset-surface"  type="button">
<img alt={product.name} className="w-full h-full object-contain mix-blend-multiply" src={product.image} />
<span className="sr-only">View Lateral Profile</span>
</button>
</div>

<div className="flex-1 relative bg-[#F4F4F4] overflow-hidden aspect-square flex items-center justify-center p-space-md group">

<div className="absolute inset-0 bg-gradient-to-tr from-surface-container-low/80 via-transparent to-surface-bright/50 pointer-events-none"></div>

<div className="absolute top-space-md left-space-md flex flex-col gap-1.5 z-10">
</div>

<div className="absolute top-space-md right-space-md flex items-center gap-2 z-10">
<button className="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface shadow-sm hover:shadow-md flex items-center justify-center transition-all"  title="Inspect High Resolution" type="button">
<span className="material-symbols-outlined text-[18px]">zoom_in</span>
</button>
</div>

<div className="relative w-full h-full flex items-center justify-center" id="main-gallery-viewport">
<img alt={product.name} className="w-full h-full object-contain mix-blend-multiply drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] p-2" id="main-product-img" src={product.image}  />
</div>
</div>
</div>


<div className="lg:col-span-5 flex flex-col gap-6 font-sans">

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
  <div className="flex items-center gap-2 mt-4 text-sm">
    <span className="text-neutral-500">Color:</span>
    <span className="text-brand-black">Standard Edition</span>
  </div>

  {/* Size Selection */}
  <div className="flex flex-col gap-2 mt-4">
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
  <div className="flex flex-col gap-2 mt-4">
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
  <div className="flex flex-col gap-3 mt-6">
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

<section className="w-full bg-surface-container-highest relative overflow-hidden py-space-lg">
<div className="max-w-[1360px] mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-space-lg items-center">
<div className="flex flex-col gap-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Provenance • Italy</span>
<h2 className="font-headline-md text-headline-md text-on-surface font-bold">Crafted in Civitanova Marche</h2>
<p className="font-body-md text-body-md text-on-surface-variant">
          Produced in small batches of 180 pairs by multi-generational cordwainers using centuries-old strobel techniques combined with precision laser skiving.
        </p>
</div>

<div className="flex flex-col items-center justify-center p-space-md bg-[#F4F4F4]">
<svg className="w-full max-w-[240px] h-28 text-on-surface" fill="none" viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg">
<path d="M20 75C40 75 70 73 95 72C130 70 170 65 210 60C220 58 225 50 220 40C210 25 180 20 150 28C130 33 110 38 90 40C70 42 40 45 30 55C20 65 20 75 20 75Z" stroke="currentColor" stroke-dasharray="4 2" strokeWidth="2"></path>
<path d="M20 75L215 75C225 75 228 68 220 60" stroke="#a23e18" strokeWidth="2.5"></path>
<circle cx="50" cy="55" fill="#a23e18" r="4"></circle>
<circle cx="160" cy="35" fill="#1c1c19" r="4"></circle>
<circle cx="110" cy="72" fill="#a23e18" r="3"></circle>
<text fill="#77767b" font-family="Plus Jakarta Sans" font-size="9" font-weight="700" x="35" y="92">ZERO-DROP SOLE</text>
<text fill="#77767b" font-family="Plus Jakarta Sans" font-size="9" font-weight="700" x="145" y="18">ANATOMICAL VAMP</text>
</svg>
<span className="font-label-sm text-[10px] tracking-wider uppercase text-on-surface-variant mt-0.5">Biomechanical Last Calibration</span>
</div>
<div className="flex flex-col gap-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Circularity</span>
<h2 className="font-headline-md text-headline-md text-on-surface font-bold">Recraftable Philosophy</h2>
<p className="font-body-md text-body-md text-on-surface-variant">
          Engineered to be resoled indefinitely. When your cupsole reaches end-of-life, return it to our Civitanova atelier for our factory renewal program.
        </p>
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
<Link to="/product" state={{ name: "Retro Low GAT Trainer", price: 225, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop" }} className="flex flex-col cursor-pointer group">
  <div className="w-full aspect-square bg-[#F4F4F4] overflow-hidden flex items-center justify-center p-6 relative">
    <img alt="Retro Low GAT Trainer" className="w-full h-full object-contain" src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop" />
    <button className="absolute bottom-3 left-3 right-3 bg-brand-black text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" type="button">
      Add to Cart
    </button>
  </div>
  <p className="text-sm text-brand-charcoal font-normal leading-snug mt-3 px-1">Retro Low GAT Trainer</p>
  <p className="text-[13px] text-black font-medium mt-0.5 px-1"><PriceDisplay amount={225} /></p>
</Link>

<Link to="/product" state={{ name: "Oxblood Double Monk Strap", price: 345, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" }} className="flex flex-col cursor-pointer group">
  <div className="w-full aspect-square bg-[#F4F4F4] overflow-hidden flex items-center justify-center p-6 relative">
    <img alt="Oxblood Double Monk Strap" className="w-full h-full object-contain" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" />
    <button className="absolute bottom-3 left-3 right-3 bg-brand-black text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" type="button">
      Add to Cart
    </button>
  </div>
  <p className="text-sm text-brand-charcoal font-normal leading-snug mt-3 px-1">Oxblood Double Monk Strap</p>
  <p className="text-[13px] text-black font-medium mt-0.5 px-1"><PriceDisplay amount={345} /></p>
</Link>

<Link to="/product" state={{ name: "Tuscan Suede Chukka Boot", price: 280, image: "https://images.unsplash.com/photo-1508296695146-257a814050b4?q=80&w=800&auto=format&fit=crop" }} className="flex flex-col cursor-pointer group">
  <div className="w-full aspect-square bg-[#F4F4F4] overflow-hidden flex items-center justify-center p-6 relative">
    <img alt="Tuscan Suede Chukka Boot" className="w-full h-full object-contain" src="https://images.unsplash.com/photo-1508296695146-257a814050b4?q=80&w=800&auto=format&fit=crop" />
    <button className="absolute bottom-3 left-3 right-3 bg-brand-black text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" type="button">
      Add to Cart
    </button>
  </div>
  <p className="text-sm text-brand-charcoal font-normal leading-snug mt-3 px-1">Tuscan Suede Chukka Boot</p>
  <p className="text-[13px] text-black font-medium mt-0.5 px-1"><PriceDisplay amount={280} /></p>
</Link>

<Link to="/product" state={{ name: "Pebbled Leather Driving Loafer", price: 210, image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop" }} className="flex flex-col cursor-pointer group">
  <div className="w-full aspect-square bg-[#F4F4F4] overflow-hidden flex items-center justify-center p-6 relative">
    <img alt="Pebbled Leather Driving Loafer" className="w-full h-full object-contain" src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop" />
    <button className="absolute bottom-3 left-3 right-3 bg-brand-black text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" type="button">
      Add to Cart
    </button>
  </div>
  <p className="text-sm text-brand-charcoal font-normal leading-snug mt-3 px-1">Pebbled Leather Driving Loafer</p>
  <p className="text-[13px] text-black font-medium mt-0.5 px-1"><PriceDisplay amount={210} /></p>
</Link>
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
