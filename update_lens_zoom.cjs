const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Product.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace state
content = content.replace(
  "const [zoomOrigin, setZoomOrigin] = React.useState('50% 50%');",
  "const [lensPos, setLensPos] = React.useState({ x: 0, y: 0, percX: 50, percY: 50, show: false });"
);

// Replace handleMouseMove
const oldHandle = `  const handleMouseMove = (e) => {
    if (!isMagnifyOpen) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomOrigin(\`\${x}% \${y}%\`);
  };`;
const newHandle = `  const handleMouseMove = (e) => {
    if (!isMagnifyOpen) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const percX = (x / width) * 100;
    const percY = (y / height) * 100;
    setLensPos({ x, y, percX, percY, show: true });
  };`;
content = content.replace(oldHandle, newHandle);

// Replace JSX
const oldJsx = `<div 
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
</div>`;
const newJsx = `<div 
  className={\`relative w-full h-full flex items-center justify-center \${isMagnifyOpen ? 'cursor-none' : ''}\`} 
  id="main-gallery-viewport"
  onMouseMove={handleMouseMove}
  onMouseLeave={() => setLensPos(prev => ({ ...prev, show: false }))}
>
<img 
  alt={product.name} 
  className={\`w-full h-full object-contain mix-blend-multiply drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] p-2\`} 
  id="main-product-img" 
  src={product.image}  
/>
{isMagnifyOpen && lensPos.show && (
  <div 
    className="absolute pointer-events-none rounded-full border border-neutral-300 shadow-2xl bg-no-repeat bg-[#F4F4F4] z-50 mix-blend-multiply"
    style={{
      width: '180px',
      height: '180px',
      left: \`\${lensPos.x - 90}px\`,
      top: \`\${lensPos.y - 90}px\`,
      backgroundImage: \`url(\${product.image})\`,
      backgroundPosition: \`\${lensPos.percX}% \${lensPos.percY}%\`,
      backgroundSize: '300%' // Zoom level
    }}
  />
)}
</div>`;

content = content.replace(oldJsx, newJsx);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated Product.jsx with Lens Zoom");
