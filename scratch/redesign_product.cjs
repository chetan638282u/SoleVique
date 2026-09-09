const fs = require('fs');
const path = require('path');

const productPath = path.join(__dirname, '..', 'src', 'pages', 'Product.jsx');
let content = fs.readFileSync(productPath, 'utf8');

// We need to add state for the accordion.
content = content.replace(
  "const [isSizeGuideOpen, setIsSizeGuideOpen] = React.useState(false);",
  "const [isSizeGuideOpen, setIsSizeGuideOpen] = React.useState(false);\n  const [isDescOpen, setIsDescOpen] = React.useState(false);\n  const navigate = require('react-router-dom').useNavigate();"
);

// We need to import useNavigate.
content = content.replace(
  "import { Link, useLocation } from 'react-router-dom';",
  "import { Link, useLocation, useNavigate } from 'react-router-dom';"
);
content = content.replace(
    "const navigate = require('react-router-dom').useNavigate();",
    "const navigate = useNavigate();"
);

// We will replace the entire <div className="lg:col-span-5 flex flex-col gap-space-md"> block.
// This block starts at around line 79 and ends at line 255.

const newRightColumn = `
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
      Rs. {Math.round(product.price * 1.2 * 83).toLocaleString()}
    </span>
    <span className="text-2xl text-brand-black font-black">
      Rs. {(product.price * 83).toLocaleString()}
    </span>
    <span className="px-3 py-1 bg-brand-black text-white text-[10px] uppercase tracking-wider font-bold rounded-full">
      10% off
    </span>
  </div>

  <div className="text-sm text-neutral-600 mb-2">
    Tax included. <Link to="/shipping" className="underline hover:text-brand-black">Shipping</Link> calculated at checkout.
  </div>

  {/* Color Selection */}
  <div className="flex flex-col gap-2 mt-4">
    <span className="text-sm text-neutral-500 mb-1">Color</span>
    <div className="flex items-center gap-2">
      <div className="px-6 py-3 bg-[#2D2A32] text-white border border-[#2D2A32] text-sm cursor-default">
        standard edition
      </div>
    </div>
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
          className={\`w-14 h-12 flex items-center justify-center border text-sm transition-colors \${
            selectedSize === size 
            ? 'bg-[#2D2A32] text-white border-[#2D2A32]' 
            : 'bg-white text-brand-black border-neutral-300 hover:border-neutral-500'
          }\`}
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
        <span className={\`material-symbols-outlined text-[20px] transform transition-transform \${isDescOpen ? 'rotate-180' : ''}\`}>
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
`;

// Find the start of the right column
const startIndex = content.indexOf('<div className="lg:col-span-5 flex flex-col gap-space-md">');
// Find the end of it by looking for the closing tag of section right before it
const endIndex = content.indexOf('</section>', startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = content.substring(0, startIndex) + newRightColumn + '\n</div>\n' + content.substring(endIndex);
  fs.writeFileSync(productPath, newContent, 'utf8');
  console.log("Successfully replaced the right column.");
} else {
  console.log("Could not find replacement indices.");
}
