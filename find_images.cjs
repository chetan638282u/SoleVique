const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const srcDir = './old_html';
const destPagesDir = './src/pages';
const destComponentsDir = './src/components';
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.html'));

const styleMap = {}; // mapping filename -> [ { className, styleStr } ]

for (const file of files) {
  const content = fs.readFileSync(path.join(srcDir, file), 'utf8');
  const $ = cheerio.load(content);
  
  styleMap[file] = [];
  
  $('[style*="background-image"]').each((i, el) => {
    const style = $(el).attr('style');
    let className = $(el).attr('class');
    const bgMatch = style.match(/background-image:\s*url\(['"]?(.*?)['"]?\)/);
    
    // We also need to map <img> tags that were stripped if any, but let's stick to background images first
    if (bgMatch && className) {
      // In JSX, class="foo" might have been changed if we did regex replacements (e.g. removed some spaces) but mostly it's identical
      styleMap[file].push({ className, styleStr: bgMatch[1] });
    }
  });
}

function restoreStylesInJSX(jsxPath, htmlFile) {
  if (!fs.existsSync(jsxPath)) return;
  let content = fs.readFileSync(jsxPath, 'utf8');
  let updated = false;
  
  if (styleMap[htmlFile]) {
    for (const item of styleMap[htmlFile]) {
      // Find the exact className
      const escapedClass = item.className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const classRegex = new RegExp(`className="${escapedClass}"`, 'g');
      
      content = content.replace(classRegex, (match) => {
        // If it already has a style, skip it to prevent duplicating
        if (match.includes('style=')) return match;
        
        updated = true;
        return `${match} style={{ backgroundImage: "url('${item.styleStr}')" }}`;
      });
    }
  }
  
  if (updated) {
    fs.writeFileSync(jsxPath, content, 'utf8');
    console.log(`Restored background images in ${path.basename(jsxPath)}`);
  }
}

restoreStylesInJSX(path.join(destPagesDir, 'Home.jsx'), 'index.html');
restoreStylesInJSX(path.join(destPagesDir, 'Men.jsx'), 'men.html');
restoreStylesInJSX(path.join(destPagesDir, 'Women.jsx'), 'women.html');
restoreStylesInJSX(path.join(destPagesDir, 'Bestsellers.jsx'), 'bestsellers.html');
restoreStylesInJSX(path.join(destPagesDir, 'Sale.jsx'), 'sale.html');
restoreStylesInJSX(path.join(destPagesDir, 'NewArrivals.jsx'), 'new-arrivals.html');
restoreStylesInJSX(path.join(destPagesDir, 'Product.jsx'), 'product.html');
restoreStylesInJSX(path.join(destPagesDir, 'Cart.jsx'), 'cart.html');

console.log("Done restoring background images.");
