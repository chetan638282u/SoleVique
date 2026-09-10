import React from 'react';
import PriceDisplay from '../components/PriceDisplay';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, addToCart } = useCart();
  const [editingItem, setEditingItem] = React.useState(null);
  const [editSize, setEditSize] = React.useState("");
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div className="flex flex-col w-full bg-white min-h-screen pb-20">
        <div className="max-w-[1360px] mx-auto w-full px-[15px] py-12">
          
          <h1 className="font-architectural text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight mb-8">
            Your Bag ({cartItems.length})
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20 border border-neutral-200">
              <p className="font-bold text-brand-black mb-4 uppercase tracking-widest text-lg">Your bag is empty.</p>
              <Link to="/" className="inline-flex h-12 items-center justify-center px-8 bg-brand-black text-white font-bold uppercase tracking-wider text-xs">Continue Shopping</Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              
              {/* Left Column: Products */}
              <div className="w-full lg:flex-1 flex flex-col gap-4">
                {cartItems.map((item, index) => (
                  <article key={`${item.name}-${item.size}-${index}`} className="border border-neutral-200 p-4 bg-white flex flex-col sm:flex-row relative">
                    
                    {/* Left: Image & In Stock */}
                    <div className="w-full sm:w-48 flex flex-col items-center flex-shrink-0">
                      <div className="w-full aspect-square bg-[#F4F4F4] p-4 flex items-center justify-center">
                        <img alt={item.name} className="w-full h-full object-contain pointer-events-none select-none" src={item.image} />
                      </div>
                      <div className="mt-3 flex items-center gap-1 border border-[#586337] text-[#586337] px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider self-start sm:self-center">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        IN STOCK
                      </div>
                    </div>

                    {/* Right: Info */}
                    <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 flex flex-col relative">
                      
                      {/* Name & Price */}
                      <div className="flex justify-between items-start">
                        <h2 className="font-bold text-brand-black text-base sm:text-lg tracking-wide pr-8 leading-tight">{item.name}</h2>
                        <span className="font-bold text-lg text-brand-black shrink-0"><PriceDisplay amount={item.price * item.quantity} /></span>
                      </div>
                      
                      <div className="mt-3 flex flex-col gap-1 text-[13px] text-neutral-600">
                        <p>Color: Standard Edition</p>
                        <p>Size: UK/IN {item.size}</p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="mt-6 flex flex-col">
                        <div className="flex items-center border border-neutral-300 w-[100px] h-10 bg-transparent">
                          <button 
                            onClick={() => updateQuantity(item.name, item.size, Math.max(1, item.quantity - 1))} 
                            aria-label="Decrease quantity" 
                            className="w-8 h-full flex items-center justify-center text-neutral-500 hover:text-brand-black hover:bg-neutral-100 transition-colors" 
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[16px]">remove</span>
                          </button>
                          <span className="flex-1 text-center font-bold text-sm text-brand-black">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.name, item.size, item.quantity + 1)} 
                            aria-label="Increase quantity" 
                            className="w-8 h-full flex items-center justify-center text-neutral-500 hover:text-brand-black hover:bg-neutral-100 transition-colors" 
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[16px]">add</span>
                          </button>
                        </div>
                      </div>

                      {/* Edit & Trash Icons */}
                      <div className="absolute top-10 right-0 sm:top-auto sm:bottom-0 flex items-center gap-4 text-neutral-500">
                        <button onClick={() => { setEditingItem(item); setEditSize(item.size); }} aria-label="Edit item" className="hover:text-brand-black transition-colors" type="button">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button onClick={() => removeFromCart(item.name, item.size)} aria-label="Remove item" className="hover:text-brand-black transition-colors" type="button">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>

                    </div>
                  </article>
                ))}
              </div>

              {/* Right Column: Summary */}
              <div className="w-full lg:w-[380px] flex flex-col gap-4">
                
                <div className="border border-neutral-200 py-3 px-2 flex items-center justify-center gap-2 text-[#586337] font-bold text-xs uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  YOU'VE EARNED FREE SHIPPING
                </div>
                
                <div className="border border-neutral-200 py-3 px-2 flex items-center justify-center gap-2 text-brand-black font-bold text-xs uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                  FREE RETURNS ON ALL QUALIFYING ORDERS.
                </div>

                <div className="bg-[#EAEAEA] py-4 px-4 flex items-center justify-between cursor-pointer font-bold text-sm tracking-wide mt-2">
                  <span>APPLY A PROMO CODE</span>
                  <span className="material-symbols-outlined text-[20px]">expand_more</span>
                </div>

                <div className="flex flex-col gap-3 mt-4 text-sm px-1">
                  <div className="flex justify-between font-bold text-neutral-500 text-xs tracking-wider uppercase">
                    <span>SUBTOTAL</span>
                    <span className="text-brand-black"><PriceDisplay amount={subtotal} /></span>
                  </div>
                  <div className="flex justify-between font-bold text-neutral-500 text-xs tracking-wider uppercase">
                    <span>SHIPPING COSTS</span>
                    <span className="text-brand-black">FREE</span>
                  </div>
                </div>

                <hr className="my-2 border-neutral-200" />

                <div className="flex justify-between items-end mb-6 px-1">
                  <div className="flex flex-col">
                    <span className="font-bold text-brand-black text-lg tracking-wide uppercase leading-none mb-1">ORDER TOTAL</span>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider">PRICES INCLUDE GST</span>
                  </div>
                  <span className="font-bold text-brand-black text-xl leading-none"><PriceDisplay amount={subtotal} /></span>
                </div>

                <button className="w-full bg-brand-black text-white font-bold text-[13px] uppercase tracking-wider py-4 hover:bg-neutral-800 transition-colors" type="button">
                  PROCEED TO SECURE CHECKOUT
                </button>
                
              </div>
            </div>
          )}
        </div>
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-none max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6 border-b border-neutral-200 pb-4">
              <h3 className="font-architectural text-2xl font-bold text-brand-black uppercase tracking-wide">Edit Item</h3>
              <button onClick={() => setEditingItem(null)} className="text-neutral-400 hover:text-brand-black transition-colors" type="button">
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <img src={editingItem.image} alt={editingItem.name} className="w-20 h-20 object-contain bg-[#F4F4F4] p-2" />
              <div>
                <h4 className="font-bold text-brand-black text-sm">{editingItem.name}</h4>
                <p className="text-xs text-neutral-500 mt-1">Current Size: UK/IN {editingItem.size}</p>
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
              className="w-full bg-brand-black text-white font-bold text-sm uppercase tracking-wider py-4 hover:bg-neutral-800 transition-colors"
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
