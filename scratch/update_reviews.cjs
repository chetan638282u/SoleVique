const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Change names and initials
content = content.replace(
    '<span className="block font-bold text-sm text-brand-black">Elena Rostova</span>',
    '<span className="block font-bold text-sm text-brand-black">Priya Sharma</span>'
);
content = content.replace('ER', 'PS');
content = content.replace('Architectural Designer, Milan', 'Architectural Designer, Mumbai');

content = content.replace(
    '<span className="block font-bold text-sm text-brand-black">Julian Vance</span>',
    '<span className="block font-bold text-sm text-brand-black">Arjun Patel</span>'
);
content = content.replace('JV', 'AP');
content = content.replace('Creative Director, NYC', 'Creative Director, Bengaluru');

content = content.replace(
    '<span className="block font-bold text-sm text-brand-black">Marcus Sterling</span>',
    '<span className="block font-bold text-sm text-brand-black">Rohan Desai</span>'
);
content = content.replace('MS', 'RD');
content = content.replace('Product Strategist, London', 'Product Strategist, New Delhi');


// 2. Make the second review 4 stars instead of 5
// The second review is the Julian Vance (now Arjun Patel) review.
// Let's find the specific block.
const starSvg = '<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
const emptyStarSvg = '<svg className="w-4 h-4 fill-neutral-300" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';

// Replace exactly 1 star from the block associated with "Remarkable Italian leather craftsmanship."
// I can do a regex or just replace a specific chunk.
const fiveStarsBlock = `<div className="flex items-center gap-1 text-yellow-500 mb-4">\n${starSvg}\n${starSvg}\n${starSvg}\n${starSvg}\n${starSvg}\n</div>\n<p className="text-sm sm:text-base text-brand-black leading-relaxed font-medium mb-6">\n            “Remarkable`;

const fourStarsBlock = `<div className="flex items-center gap-1 text-yellow-500 mb-4">\n${starSvg}\n${starSvg}\n${starSvg}\n${starSvg}\n${emptyStarSvg}\n</div>\n<p className="text-sm sm:text-base text-brand-black leading-relaxed font-medium mb-6">\n            “Remarkable`;

content = content.replace(fiveStarsBlock, fourStarsBlock);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Reviews updated');
