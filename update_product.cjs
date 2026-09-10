const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Product.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add import for products
content = content.replace(
  "import { Link, useLocation, useNavigate } from 'react-router-dom';",
  "import { Link, useLocation, useNavigate } from 'react-router-dom';\nimport { products } from '../data/products';"
);

// 2. Remove the provenance section
const provenanceStart = content.indexOf('<section className="w-full bg-surface-container-highest relative overflow-hidden py-space-lg">');
const provenanceEnd = content.indexOf('</section>', provenanceStart) + 10;
content = content.substring(0, provenanceStart) + content.substring(provenanceEnd);

// 3. Replace the dummy products grid with mapped products
const gridStartStr = '<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">';
const gridStart = content.indexOf(gridStartStr);
const gridEndStr = '</div>\n</section>\n\n\n\n{isSizeGuideOpen && (';
const gridEnd = content.indexOf(gridEndStr);

const relatedProductsLogic = `
<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
{products.filter(p => p.name !== product.name).slice(0, 4).map((relatedProduct, idx) => (
  <Link key={idx} to="/product" state={{ name: relatedProduct.name, price: relatedProduct.price, image: relatedProduct.image, categories: relatedProduct.categories, sizes: relatedProduct.sizes }} className="flex flex-col cursor-pointer group">
    <div className="w-full aspect-square bg-[#F4F4F4] overflow-hidden flex items-center justify-center p-6 relative">
      <img alt={relatedProduct.name} className="w-full h-full object-contain" src={relatedProduct.image} />
      <button className="absolute bottom-3 left-3 right-3 bg-brand-black text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-lg opacity-0 lg:group-hover:opacity-100 active:opacity-100 transition-opacity duration-300" type="button" onClick={(e) => { e.preventDefault(); addToCart(relatedProduct, 1, relatedProduct.sizes?.[0] || '8'); }}>
        Add to Cart
      </button>
    </div>
    <p className="text-sm text-brand-charcoal font-normal leading-snug mt-3 px-1 truncate">{relatedProduct.name}</p>
    <p className="text-[13px] text-black font-medium mt-0.5 px-1"><PriceDisplay amount={relatedProduct.price} /></p>
  </Link>
))}
`;

content = content.substring(0, gridStart) + relatedProductsLogic + content.substring(gridEnd);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated Product.jsx");
