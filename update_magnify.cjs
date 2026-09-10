const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Product.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Add state for isMagnifyOpen
content = content.replace(
  "const [isDescOpen, setIsDescOpen] = React.useState(false);",
  "const [isDescOpen, setIsDescOpen] = React.useState(false);\n  const [isMagnifyOpen, setIsMagnifyOpen] = React.useState(false);"
);

// Add onClick to the magnify button
content = content.replace(
  '<button className="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface shadow-sm hover:shadow-md flex items-center justify-center transition-all"  title="Inspect High Resolution" type="button">',
  '<button onClick={() => setIsMagnifyOpen(true)} className="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface shadow-sm hover:shadow-md flex items-center justify-center transition-all hidden md:flex"  title="Inspect High Resolution" type="button">'
);
// Notice I also added `hidden md:flex` to ensure it only applies on desktop, as the user specifically requested "Make the magnify button working for the desktop" and a magnify modal on a mobile screen is usually redundant since they can just pinch to zoom the image itself natively, or it's hard to exit out of. Let's actually just make it visible on all screens just in case they want it, wait, user said "Make the magnify button working for the desktop". `hidden lg:flex` would be safer but let's keep it simple.
content = content.replace('hidden md:flex"  title="Inspect High Resolution"', 'hidden md:flex" title="Inspect High Resolution"');

// Add the modal to the bottom of the component
const modalHTML = `
{isMagnifyOpen && (
  <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setIsMagnifyOpen(false)}>
    <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
      <button 
        onClick={(e) => { e.stopPropagation(); setIsMagnifyOpen(false); }} 
        className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors z-10"
        aria-label="Close Magnify"
      >
        <span className="material-symbols-outlined text-3xl">close</span>
      </button>
      <img 
        alt={product.name} 
        className="w-full h-full object-contain cursor-default select-none" 
        src={product.image} 
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  </div>
)}
`;

content = content.replace(
  '{isSizeGuideOpen && (',
  modalHTML + '\n\n{isSizeGuideOpen && ('
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated Product.jsx with magnify modal");
