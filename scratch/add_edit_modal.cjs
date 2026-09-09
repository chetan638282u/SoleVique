const fs = require('fs');
const path = require('path');

const cartPath = path.join(__dirname, '..', 'src', 'pages', 'Cart.jsx');
let content = fs.readFileSync(cartPath, 'utf8');

// 1. Update useCart import to include addToCart
content = content.replace(
  'const { cartItems, removeFromCart, updateQuantity } = useCart();',
  'const { cartItems, removeFromCart, updateQuantity, addToCart } = useCart();\n  const [editingItem, setEditingItem] = React.useState(null);\n  const [editSize, setEditSize] = React.useState("");'
);

// 2. Update the Edit button
content = content.replace(
  /<button aria-label="Edit item" className="hover:text-brand-black transition-colors" type="button">/g,
  '<button onClick={() => { setEditingItem(item); setEditSize(item.size); }} aria-label="Edit item" className="hover:text-brand-black transition-colors" type="button">'
);

// 3. Add the modal before the final </div> of the component.
// We can find the closing </> tag at the end.
const modalCode = `
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
              className="w-full bg-brand-black text-white font-bold text-sm uppercase tracking-wider py-4 hover:bg-neutral-800 transition-colors"
              type="button"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
`;

content = content.replace(
  '    </>\n  );\n}\n',
  modalCode + '    </>\n  );\n}\n'
);

fs.writeFileSync(cartPath, content, 'utf8');
console.log("Successfully added the edit modal to Cart.jsx");
