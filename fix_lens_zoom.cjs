const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Product.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// I will remove p-2 from the main image to fix the coordinate alignment.
content = content.replace(
  'drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] p-2',
  'drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)]'
);

// I will also increase the zoom level from 300% to 400% for a better effect
content = content.replace(
  "backgroundSize: '300%'",
  "backgroundSize: '400%'"
);

// And ensure the lens has mix-blend-multiply if needed, but actually it's a solid bg so it should just overlay nicely. 
// Wait, the lens currently has `mix-blend-multiply` on it! That might make it totally invisible if the background is dark, or blend weirdly!
// "bg-no-repeat bg-[#F4F4F4] z-50 mix-blend-multiply" 
// Let's remove mix-blend-multiply from the lens container so it covers the image opaquely!
content = content.replace(
  'bg-no-repeat bg-[#F4F4F4] z-50 mix-blend-multiply',
  'bg-no-repeat bg-white z-50'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated lens zoom alignment and opacity");
