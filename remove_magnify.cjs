const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Product.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove states
content = content.replace("const [isMagnifyOpen, setIsMagnifyOpen] = React.useState(false);", "");
content = content.replace("const [lensPos, setLensPos] = React.useState({ x: 0, y: 0, percX: 50, percY: 50, show: false });", "");

// 2. Remove handleMouseMove
const handleStart = content.indexOf("const handleMouseMove");
if (handleStart !== -1) {
  const handleEnd = content.indexOf("};\n  const navigate = useNavigate();");
  content = content.substring(0, handleStart) + content.substring(handleEnd + 3);
}

// 3. Remove zoom button
const btnStart = content.indexOf('<div className="absolute top-space-md right-space-md flex items-center gap-2 z-10">');
if (btnStart !== -1) {
  const btnEnd = content.indexOf('</div>', btnStart) + 6;
  content = content.substring(0, btnStart) + content.substring(btnEnd);
}

// 4. Clean up viewport div
const oldViewport = `<div 
  className={\`relative w-full h-full flex items-center justify-center \${isMagnifyOpen ? 'cursor-none' : ''}\`} 
  id="main-gallery-viewport"
  onMouseMove={handleMouseMove}
  onMouseLeave={() => setLensPos(prev => ({ ...prev, show: false }))}
>
<img 
  alt={product.name} 
  className={\`w-full h-full object-contain mix-blend-multiply drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)]\`} 
  id="main-product-img" 
  src={product.image}  
/>
{isMagnifyOpen && lensPos.show && (
  <div 
    className="absolute pointer-events-none rounded-full border border-neutral-300 shadow-2xl bg-no-repeat bg-white z-50"
    style={{
      width: '180px',
      height: '180px',
      left: \`\${lensPos.x - 90}px\`,
      top: \`\${lensPos.y - 90}px\`,
      backgroundImage: \`url(\${product.image})\`,
      backgroundPosition: \`\${lensPos.percX}% \${lensPos.percY}%\`,
      backgroundSize: '400%' // Zoom level
    }}
  />
)}
</div>`;

const newViewport = `<div 
  className="relative w-full h-full flex items-center justify-center" 
  id="main-gallery-viewport"
>
<img 
  alt={product.name} 
  className="w-full h-full object-contain mix-blend-multiply drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)]" 
  id="main-product-img" 
  src={product.image}  
/>
</div>`;

content = content.replace(oldViewport, newViewport);

// Clean up extra blank lines that might have been left
content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Removed magnify code completely.");
