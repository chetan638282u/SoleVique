const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Product.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove the old full screen modal
const modalStartStr = '{isMagnifyOpen && (';
const modalStart = content.indexOf(modalStartStr);
if (modalStart !== -1) {
  const modalEndStr = '</div>\n  </div>\n)}\n';
  const modalEnd = content.indexOf(modalEndStr, modalStart) + modalEndStr.length;
  content = content.substring(0, modalStart) + content.substring(modalEnd);
}

// 2. Add zoomOrigin state and handleMouseMove function
content = content.replace(
  'const [isMagnifyOpen, setIsMagnifyOpen] = React.useState(false);',
  `const [isMagnifyOpen, setIsMagnifyOpen] = React.useState(false);
  const [zoomOrigin, setZoomOrigin] = React.useState('50% 50%');

  const handleMouseMove = (e) => {
    if (!isMagnifyOpen) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomOrigin(\`\${x}% \${y}%\`);
  };`
);

// 3. Update the button
content = content.replace(
  '<button onClick={() => setIsMagnifyOpen(true)} className="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface shadow-sm hover:shadow-md flex items-center justify-center transition-all hidden md:flex" title="Inspect High Resolution" type="button">\n<span className="material-symbols-outlined text-[18px]">zoom_in</span>',
  '<button onClick={() => setIsMagnifyOpen(!isMagnifyOpen)} className="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface shadow-sm hover:shadow-md flex items-center justify-center transition-all hidden md:flex z-50" title={isMagnifyOpen ? "Close Magnifier" : "Inspect High Resolution"} type="button">\n<span className="material-symbols-outlined text-[18px]">{isMagnifyOpen ? "zoom_out" : "zoom_in"}</span>'
);

// 4. Update the viewport and image
content = content.replace(
  '<div className="relative w-full h-full flex items-center justify-center" id="main-gallery-viewport">\n<img alt={product.name} className="w-full h-full object-contain mix-blend-multiply drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] p-2" id="main-product-img" src={product.image}  />\n</div>',
  `<div 
  className={\`relative w-full h-full flex items-center justify-center \${isMagnifyOpen ? 'cursor-crosshair' : ''}\`} 
  id="main-gallery-viewport"
  onMouseMove={handleMouseMove}
  onMouseLeave={() => setZoomOrigin('50% 50%')}
>
<img 
  alt={product.name} 
  className={\`w-full h-full object-contain mix-blend-multiply drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] p-2 transition-transform duration-75 \${isMagnifyOpen ? 'scale-[2.5]' : 'scale-100'}\`} 
  id="main-product-img" 
  src={product.image}  
  style={{ transformOrigin: zoomOrigin }}
/>
</div>`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated Product.jsx inline zoom");
