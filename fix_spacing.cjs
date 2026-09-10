const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Product.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Change parent gap from gap-6 to gap-4
content = content.replace(
  '<div className="lg:col-span-5 flex flex-col gap-6 font-sans">',
  '<div className="lg:col-span-5 flex flex-col gap-4 font-sans">'
);

// 2. Remove mt-4 from Color Selection
content = content.replace(
  '<div className="flex items-center gap-2 mt-4 text-sm">',
  '<div className="flex items-center gap-2 text-sm">'
);

// 3. Remove mt-4 from Size Selection
content = content.replace(
  '{/* Size Selection */}\n  <div className="flex flex-col gap-2 mt-4">',
  '{/* Size Selection */}\n  <div className="flex flex-col gap-2">'
);

// 4. Remove mt-4 from Quantity
content = content.replace(
  '{/* Quantity */}\n  <div className="flex flex-col gap-2 mt-4">',
  '{/* Quantity */}\n  <div className="flex flex-col gap-2">'
);

// 5. Remove mt-6 from Actions
content = content.replace(
  '{/* Actions */}\n  <div className="flex flex-col gap-3 mt-6">',
  '{/* Actions */}\n  <div className="flex flex-col gap-3">'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated Product.jsx gap spacing");
