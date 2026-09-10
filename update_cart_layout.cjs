const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Cart.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const newRender = `
  return (
    <>
      <div className="flex flex-col w-full bg-white min-h-screen pb-20">
        <div className="w-full max-w-[500px] mx-auto px-4 py-8 flex flex-col">
          
          <h1 className="font-bold text-xl sm:text-2xl uppercase tracking-tight mb-4 text-brand-black">
            MY SHOPPING CART <span className="font-normal text-neutral-400">({cartItems.length})</span>
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20 border border-neutral-200">
              <p className="font-bold text-brand-black mb-4 uppercase tracking-widest text-lg">Your bag is empty.</p>
              <Link to="/" className="inline-flex h-12 items-center justify-center px-8 bg-brand-black text-white font-bold uppercase tracking-wider text-xs">Continue Shopping</Link>
            </div>
          ) : (
            <div className="flex flex-col w-full">
              
              {/* Products List */}
              <div className="flex flex-col gap-4">
                {cartItems.map((item, index) => (
                  <article key={\`\${item.name}-\${item.size}-\${index}\`} className="border border-neutral-200 p-4 bg-white flex flex-col relative">
                    
                    <div className="flex gap-4">
                      {/* Left: Image */}
                      <div className="w-[120px] flex flex-col gap-2 shrink-0">
                        <div className="w-full aspect-[4/3] bg-[#F4F4F4] flex items-center justify-center">
                          <img alt={item.name} className="w-[90%] h-[90%] object-contain pointer-events-none select-none mix-blend-multiply" src={item.image} />
                        </div>
                        <div className="flex items-center gap-1 border border-[#586337] text-[#586337] px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase self-start">
                          <span className="material-symbols-outlined text-[11px]">check_circle</span>
                          IN STOCK
                        </div>
                      </div>

                      {/* Right: Info */}
                      <div className="flex-1 flex flex-col">
                        <h2 className="font-bold text-brand-black text-[15px] leading-tight mb-2 pr-2">{item.name}</h2>
                        
                        <div className="flex flex-col text-[11px] text-neutral-600 mb-3">
                          <p>Color: Standard Edition</p>
                          <p>Size: UK {item.size}</p>
                          <p>Style Number: SLVQ_{item.name.substring(0,6).toUpperCase().replace(/\s/g, '')}_02</p>
                        </div>

                        {/* Quantity Selector Dropdown Lookalike */}
                        <div className="relative inline-flex flex-col">
                          <span className="absolute -top-2 left-2 bg-white px-1 text-[9px] text-neutral-500 uppercase z-10">Quantity</span>
                          <div className="flex items-center justify-between border border-neutral-300 w-16 h-8 px-2 relative mt-0">
                            <select 
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.name, item.size, parseInt(e.target.value))}
                            >
                              {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                            <span className="text-xs font-bold text-brand-black">{item.quantity}</span>
                            <span className="material-symbols-outlined text-[14px] text-neutral-600 pointer-events-none">expand_more</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Bottom Row of Item: Icons & Price */}
                    <div className="flex justify-between items-end mt-2 ml-[136px]">
                      <div className="flex items-center gap-3 text-brand-black">
                        <button onClick={() => { setEditingItem(item); setEditSize(item.size); }} aria-label="Edit item" className="hover:text-neutral-500 transition-colors" type="button">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button onClick={() => removeFromCart(item.name, item.size)} aria-label="Remove item" className="hover:text-neutral-500 transition-colors" type="button">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                      <span className="font-bold text-[15px] text-brand-black shrink-0"><PriceDisplay amount={item.price * item.quantity} /></span>
                    </div>

                  </article>
                ))}
              </div>

              {/* Rewards / Badges */}
              <div className="flex flex-col gap-2 mt-4">
                <div className="border border-neutral-200 py-3 px-2 flex items-center justify-center gap-2 text-[#0A7A44] font-bold text-[11px] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                  YOU'VE EARNED FREE SHIPPING
                </div>
                <div className="border border-neutral-200 py-3 px-2 flex items-center justify-center gap-2 text-brand-black font-bold text-[11px] uppercase tracking-wider text-center">
                  <span className="material-symbols-outlined text-[16px]">refresh</span>
                  FREE RETURNS ON ALL QUALIFYING ORDERS.
                </div>
              </div>

              {/* Promo Code */}
              <div className="bg-[#EBEBEB] py-3.5 px-4 flex items-center justify-between cursor-pointer font-normal text-brand-black text-[13px] uppercase mt-4">
                <span>APPLY A PROMO CODE</span>
                <span className="material-symbols-outlined text-[20px]">expand_more</span>
              </div>

              {/* Summary */}
              <div className="flex flex-col gap-2 mt-6 px-1 text-[11px]">
                <div className="flex justify-between font-bold text-brand-black tracking-wider uppercase">
                  <span>SUBTOTAL</span>
                  <span className="font-normal"><PriceDisplay amount={subtotal} /></span>
                </div>
                <div className="flex justify-between font-bold text-brand-black tracking-wider uppercase">
                  <span>SHIPPING COSTS</span>
                  <span className="font-normal">FREE</span>
                </div>
              </div>

              <hr className="my-4 border-neutral-300" />

              <div className="flex justify-between items-end mb-6 px-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-brand-black text-[15px] tracking-wide uppercase leading-none">ORDER TOTAL</span>
                  <span className="text-[9px] text-neutral-500 uppercase">PRICES INCLUDE GST</span>
                </div>
                <span className="font-bold text-brand-black text-lg leading-none"><PriceDisplay amount={subtotal} /></span>
              </div>

              <button className="w-full bg-[#1A1A1A] text-white font-bold text-[13px] uppercase tracking-wider py-3.5 hover:bg-black transition-colors" type="button">
                CHECKOUT
              </button>

              <p className="mt-3 text-[9px] text-neutral-500 px-1 leading-relaxed">
                By continuing, I confirm that I have read and accept the <a href="#" className="underline hover:text-brand-black">Terms and Conditions</a> and the <a href="#" className="underline hover:text-brand-black">Privacy Policy</a>.
              </p>
              
              <h2 className="font-bold text-lg uppercase tracking-tight mt-10 mb-4 text-brand-black">
                CUSTOMERS ALSO ORDERED
              </h2>

            </div>
          )}
        </div>
      </div>

      {/* Editing Modal remains identical */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-none max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6 border-b border-neutral-200 pb-4">
              <h3 className="font-bold text-xl text-brand-black uppercase tracking-wide">Edit Item</h3>
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
                    className={\`w-12 h-10 flex items-center justify-center border text-sm transition-colors \${
                      editSize === size 
                      ? 'bg-brand-black text-white border-brand-black' 
                      : 'bg-white text-brand-black border-neutral-300 hover:border-neutral-500'
                    }\`}
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
              className="w-full bg-[#1A1A1A] text-white font-bold text-sm uppercase tracking-wider py-4 hover:bg-black transition-colors"
              type="button"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
`;

const startIndex = content.indexOf('return (');
const updatedContent = content.substring(0, startIndex) + newRender + '\n}\n';

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log("Cart layout updated");
