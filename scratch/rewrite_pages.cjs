const fs = require('fs');
const path = require('path');

const menPath = path.join(__dirname, '..', 'src', 'pages', 'Men.jsx');
const newArrivalsPath = path.join(__dirname, '..', 'src', 'pages', 'NewArrivals.jsx');
const salePath = path.join(__dirname, '..', 'src', 'pages', 'Sale.jsx');

const menContent = fs.readFileSync(menPath, 'utf8');

// For New Arrivals
let newArrivalsContent = menContent.replace(
    /Men's Footwear/,
    'New Arrivals'
).replace(
    /globalProducts\.filter\(p => p\.categories\?\.includes\("Men"\)\)/,
    `globalProducts.filter(p => ["Tuscan Penny Loafer", "Architectural Cross Slide", "Arch-Court Sneaker 01", "Verona Brass Buckle Clog Mule"].includes(p.name))`
).replace(
    /export default function Men\(\) {/,
    'export default function NewArrivals() {'
);

fs.writeFileSync(newArrivalsPath, newArrivalsContent, 'utf8');

// For Sale
let saleContent = menContent.replace(
    /Men's Footwear/,
    'Archival Sale'
).replace(
    /globalProducts\.filter\(p => p\.categories\?\.includes\("Men"\)\)/,
    `globalProducts.filter(p => ["Chelsea Leather Ankle Boot", "Zero-Drop Velvet Runner", "Sculpted Block-Heel Sandal", "Retro Low GAT Trainer"].includes(p.name)).map(p => {
        const discounts = {
           "Chelsea Leather Ankle Boot": 4900,
           "Zero-Drop Velvet Runner": 1900,
           "Sculpted Block-Heel Sandal": 2100,
           "Retro Low GAT Trainer": 3900
        };
        return { ...p, originalPrice: p.price, price: discounts[p.name] || p.price };
    })`
).replace(
    /export default function Men\(\) {/,
    'export default function Sale() {'
);

// In Sale, we need to show the discounted price next to the original price.
saleContent = saleContent.replace(
    /<p className="text-\[13px\] text-black font-medium mt-0\.5 px-1"><PriceDisplay amount=\{product\.price\} \/><\/p>/g,
    `<div className="flex gap-2 items-center mt-0.5 px-1">
        <p className="text-[13px] text-brand-muted line-through"><PriceDisplay amount={product.originalPrice} /></p>
        <p className="text-[13px] text-brand-ember font-bold"><PriceDisplay amount={product.price} /></p>
      </div>`
);

fs.writeFileSync(salePath, saleContent, 'utf8');
console.log('Pages rewritten successfully.');
