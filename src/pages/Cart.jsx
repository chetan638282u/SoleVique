import React from 'react';
import PriceDisplay from '../components/PriceDisplay';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, addToCart } = useCart();
  const [editingItem, setEditingItem] = React.useState(null);
  const [editSize, setEditSize] = React.useState("");
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div className="flex flex-col bg-white min-h-screen pb-20 w-full max-w-full">
        <div className="max-w-[1360px] mx-auto w-full px-4 lg:px-[15px] py-8 lg:py-12">
          
          <h1 className="font-bold lg:font-black lg:font-architectural text-xl sm:text-2xl lg:text-4xl uppercase tracking-tight lg:tracking-tight mb-4 lg:mb-8 text-brand-black px-4 lg:px-0">
            {/* Mobile Header */}
            <span className="lg:hidden">MY SHOPPING CART <span className="font-normal text-neutral-400">({cartItems.length})</span></span>
            {/* Desktop Header */}
            <span className="hidden lg:inline">Your Bag ({cartItems.length})</span>
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20 border-y lg:border border-neutral-200 mx-0 lg:mx-0">
              <p className="font-bold text-brand-black mb-4 uppercase tracking-widest text-lg">Your bag is empty.</p>
              <Link to="/" className="inline-flex h-12 items-center justify-center px-8 bg-brand-black text-white font-bold uppercase tracking-wider text-xs">Continue Shopping</Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
              
              {/* Left Column: Products */}
              <div className="w-full lg:flex-1 flex flex-col gap-4">
                {cartItems.map((item, index) => (
                  <article key={`${item.name}-${item.size}-${index}`} className="border-y lg:border border-neutral-200 p-4 bg-white flex flex-row lg:flex-row relative">
                    
                    {/* Image Column */}
                    <div className="w-[120px] lg:w-48 flex flex-col gap-2 lg:items-center shrink-0">
                      <div className="w-full aspect-[4/3] lg:aspect-square bg-[#F4F4F4] p-0 lg:p-4 flex items-center justify-center">
                        <img alt={item.name} className="w-[90%] lg:w-full h-[90%] lg:h-full object-contain pointer-events-none select-none mix-blend-multiply drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] lg:drop-shadow-none" src={item.image} />
                      </div>
                      <div className="flex items-center gap-1 border border-[#586337] text-[#586337] px-1.5 lg:px-2 py-0.5 rounded-full text-[9px] lg:text-[10px] font-bold uppercase self-start lg:self-center mt-0 lg:mt-3">
                        <span className="material-symbols-outlined text-[11px] lg:text-[14px]">check_circle</span>
                        IN STOCK
                      </div>
                    </div>

                    {/* Info Column */}
                    <div className="flex-1 flex flex-col ml-4 lg:ml-6 relative">
                      
                      {/* Name & Price Header */}
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                        <h2 className="font-bold text-brand-black text-[15px] lg:text-lg lg:tracking-wide leading-tight mb-2 lg:mb-0 pr-2 lg:pr-8">{item.name}</h2>
                        {/* Desktop Price */}
                        <span className="hidden lg:block font-bold text-lg text-brand-black shrink-0"><PriceDisplay amount={item.price * item.quantity} /></span>
                      </div>
                      
                      <div className="flex flex-col text-[11px] lg:text-[13px] text-neutral-600 mb-3 lg:mt-3">
                        <p>Color: Standard Edition</p>
                        <p>Size: UK {item.size}</p>
                      </div>

                      {/* Quantity Selector: Plus / Minus */}
                      <div className="relative inline-flex flex-col lg:mt-6">
                        <span className="absolute -top-2 left-2 bg-white px-1 text-[9px] text-neutral-500 uppercase z-10 lg:hidden">Quantity</span>
                        <div className="flex items-center justify-between border border-neutral-300 w-24 lg:w-[100px] h-8 lg:h-10 bg-transparent">
                          <button 
                            onClick={() => updateQuantity(item.name, item.size, Math.max(1, item.quantity - 1))} 
                            className="w-8 h-full flex items-center justify-center text-neutral-500 hover:text-brand-black lg:hover:bg-neutral-100 transition-colors" 
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[14px] lg:text-[16px]">remove</span>
                          </button>
                          <span className="flex-1 text-center font-bold text-xs lg:text-sm text-brand-black">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.name, item.size, item.quantity + 1)} 
                            className="w-8 h-full flex items-center justify-center text-neutral-500 hover:text-brand-black lg:hover:bg-neutral-100 transition-colors" 
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[14px] lg:text-[16px]">add</span>
                          </button>
                        </div>
                      </div>

                      {/* Bottom Row (Mobile): Icons & Price | Desktop: Icons bottom right */}
                      <div className="flex justify-between items-end mt-2 lg:absolute lg:top-auto lg:bottom-0 lg:right-0 lg:mt-0">
                        <div className="flex items-center gap-3 lg:gap-4 text-brand-black lg:text-neutral-500">
                          <button onClick={() => { setEditingItem(item); setEditSize(item.size); }} aria-label="Edit item" className="hover:text-neutral-500 lg:hover:text-brand-black transition-colors" type="button">
                            <span className="material-symbols-outlined text-[18px] lg:text-[20px]">edit</span>
                          </button>
                          <button onClick={() => removeFromCart(item.name, item.size)} aria-label="Remove item" className="hover:text-neutral-500 lg:hover:text-brand-black transition-colors" type="button">
                            <span className="material-symbols-outlined text-[18px] lg:text-[20px]">delete</span>
                          </button>
                        </div>
                        {/* Mobile Price */}
                        <span className="lg:hidden font-bold text-[15px] text-brand-black shrink-0"><PriceDisplay amount={item.price * item.quantity} /></span>
                      </div>

                    </div>

                  </article>
                ))}
              </div>

              {/* Right Column: Summary */}
              <div className="w-full lg:w-[380px] flex flex-col gap-2 lg:gap-4 px-4 lg:px-0 mt-4 lg:mt-0">
                
                {/* Rewards / Badges */}
                <div className="border border-neutral-200 py-3 px-2 flex items-center justify-center gap-2 text-[#0A7A44] font-bold text-[11px] lg:text-xs uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px] lg:text-[18px]">local_shipping</span>
                  YOU'VE EARNED FREE SHIPPING
                </div>
                
                <div className="border border-neutral-200 py-3 px-2 flex items-center justify-center gap-2 text-brand-black font-bold text-[11px] lg:text-xs uppercase tracking-wider text-center">
                  <span className="material-symbols-outlined text-[16px] lg:text-[18px]">refresh</span>
                  FREE RETURNS ON ALL QUALIFYING ORDERS.
                </div>

                {/* Promo Code */}
                <div className="bg-[#EBEBEB] lg:bg-[#EAEAEA] py-3.5 lg:py-4 px-4 flex items-center justify-between cursor-pointer font-normal lg:font-bold text-brand-black text-[13px] lg:text-sm uppercase tracking-wide lg:mt-2">
                  <span>APPLY A PROMO CODE</span>
                  <span className="material-symbols-outlined text-[20px]">expand_more</span>
                </div>

                {/* Summary */}
                <div className="flex flex-col gap-2 lg:gap-3 mt-4 lg:mt-4 text-[11px] lg:text-sm px-1">
                  <div className="flex justify-between font-bold text-brand-black lg:text-neutral-500 tracking-wider uppercase">
                    <span>SUBTOTAL</span>
                    <span className="font-normal lg:font-bold lg:text-brand-black"><PriceDisplay amount={subtotal} /></span>
                  </div>
                  <div className="flex justify-between font-bold text-brand-black lg:text-neutral-500 tracking-wider uppercase">
                    <span>SHIPPING COSTS</span>
                    <span className="font-normal lg:font-bold lg:text-brand-black">FREE</span>
                  </div>
                </div>

                <hr className="my-4 lg:my-2 border-neutral-300 lg:border-neutral-200" />

                <div className="flex justify-between items-end mb-6 px-1">
                  <div className="flex items-center lg:flex-col lg:items-start gap-2 lg:gap-0">
                    <span className="font-bold text-brand-black text-[15px] lg:text-lg tracking-wide uppercase leading-none lg:mb-1">ORDER TOTAL</span>
                    <span className="text-[9px] lg:text-[10px] text-neutral-500 uppercase tracking-wider">PRICES INCLUDE GST</span>
                  </div>
                  <span className="font-bold text-brand-black text-lg lg:text-xl leading-none"><PriceDisplay amount={subtotal} /></span>
                </div>

                <Link to="/checkout" className="w-full flex items-center justify-center bg-[#1A1A1A] lg:bg-brand-black text-white font-bold text-[13px] uppercase tracking-wider py-3.5 lg:py-4 hover:bg-black lg:hover:bg-neutral-800 transition-colors">
                  <span className="lg:hidden">CHECKOUT</span>
                  <span className="hidden lg:inline">PROCEED TO SECURE CHECKOUT</span>
                </Link>

                <p className="mt-3 text-[9px] text-neutral-500 px-1 leading-relaxed lg:hidden">
                  By continuing, I confirm that I have read and accept the <a href="#" className="underline hover:text-brand-black">Terms and Conditions</a> and the <a href="#" className="underline hover:text-brand-black">Privacy Policy</a>.
                </p>
                
              </div>
            </div>
          )}

          {/* Customers Also Ordered is now only on Mobile, or we can show it globally at the bottom of the container */}
          {cartItems.length > 0 && (
            <div className="w-full mt-10 px-4 lg:px-0">
              <h2 className="font-bold text-lg uppercase tracking-tight mb-4 text-brand-black">
                CUSTOMERS ALSO ORDERED
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                {products.filter(p => !cartItems.some(item => item.name === p.name)).slice(0, 4).map((prod, idx) => (
                  <ProductCard key={idx} product={prod} />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Editing Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-none max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6 border-b border-neutral-200 pb-4">
              <h3 className="font-bold lg:font-architectural text-xl lg:text-2xl text-brand-black uppercase tracking-wide">Edit Item</h3>
              <button onClick={() => setEditingItem(null)} className="text-neutral-400 hover:text-brand-black transition-colors" type="button">
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <img src={editingItem.image} alt={editingItem.name} className="w-20 h-20 object-contain bg-[#F4F4F4] p-2" />
              <div>
                <h4 className="font-bold text-brand-black text-sm">{editingItem.name}</h4>
                <p className="text-xs text-neutral-500 mt-1">Current Size: UK {editingItem.size}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-8">
              <span className="text-sm font-bold text-brand-black uppercase tracking-wider">Select Size</span>
              <div className="flex flex-wrap gap-2">
                {['6', '7', '8', '9', '10'].map(size => (
                  <button 
                    key={size}
                    onClick={() => setEditSize(size)}
                    type="button"
                    className={`w-12 h-10 flex items-center justify-center border text-sm transition-colors ${
                      editSize === size 
                      ? 'bg-brand-black text-white border-brand-black' 
                      : 'bg-white text-brand-black border-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => {
                if (editSize !== editingItem.size) {
                  removeFromCart(editingItem.name, editingItem.size);
                  addToCart(editingItem, editingItem.quantity, editSize);
                }
                setEditingItem(null);
              }}
              className="w-full bg-[#1A1A1A] lg:bg-brand-black text-white font-bold text-sm uppercase tracking-wider py-4 hover:bg-black lg:hover:bg-neutral-800 transition-colors"
              type="button"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
}
