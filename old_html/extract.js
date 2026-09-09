const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const srcDir = __dirname;
const destComponentsDir = path.join(srcDir, '../src/components');
const destPagesDir = path.join(srcDir, '../src/pages');

function htmlToJsx(html) {
  let jsx = html || '';
  
  // Basic replacements
  jsx = jsx.replace(/class="/g, 'className="');
  jsx = jsx.replace(/for="/g, 'htmlFor="');
  
  // Close void tags more safely
  const voidTags = ['img', 'br', 'hr', 'input', 'meta', 'link'];
  voidTags.forEach(tag => {
    const regex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, 'g');
    jsx = jsx.replace(regex, `<${tag}$1 />`);
  });
  
  // Convert SVG attributes (camelCase)
  const svgAttrs = {
    'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'fill-rule': 'fillRule',
    'clip-rule': 'clipRule',
    'vector-effect': 'vectorEffect',
    'shape-rendering': 'shapeRendering',
    'clip-path': 'clipPath',
    'stroke-miterlimit': 'strokeMiterlimit',
    'stroke-dasharray': 'strokeDasharray',
    'stroke-dashoffset': 'strokeDashoffset',
  };
  
  for (const [key, val] of Object.entries(svgAttrs)) {
    const regex = new RegExp(`${key}="`, 'g');
    jsx = jsx.replace(regex, `${val}="`);
  }
  
  // Remove inline styles entirely
  jsx = jsx.replace(/style="[^"]*"/g, '');
  jsx = jsx.replace(/style='[^']*'/g, '');
  
  // Replace links
  jsx = jsx.replace(/href="([^"]+)\.html"/g, 'to="/$1"');
  jsx = jsx.replace(/href="index\.html"/g, 'to="/"');
  jsx = jsx.replace(/<a /g, '<Link ');
  jsx = jsx.replace(/<\/a>/g, '</Link>');
  jsx = jsx.replace(/onclick="[^"]*"/g, '');
  
  return jsx;
}

function createComponent(name, content, isPage = false) {
  if (!content) return;
  const dir = isPage ? destPagesDir : destComponentsDir;
  const importLink = content.includes('<Link') ? `import { Link } from 'react-router-dom';\n` : '';
  
  const componentStr = `import React from 'react';
${importLink}
export default function ${name}() {
  return (
    <>
      ${content}
    </>
  );
}
`;
  fs.writeFileSync(path.join(dir, `${name}.jsx`), componentStr);
}

function processFile(filename, componentName) {
  const filePath = path.join(srcDir, filename);
  if (!fs.existsSync(filePath)) return;
  
  const html = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(html);
  
  // Remove header and footer to leave just the main content
  $('header').remove();
  $('footer').remove();
  $('script').remove();
  $('[data-purpose="top-ticker"]').remove(); // Announcement bar
  
  // Get the contents of the body
  let bodyHtml = $('body').html();
  if ($('main').length > 0) {
    bodyHtml = $('main').html();
  }
  
  createComponent(componentName, htmlToJsx(bodyHtml), true);
  console.log(`Generated ${componentName}.jsx`);
}

const pages = [
  { file: 'men.html', name: 'Men' },
  { file: 'women.html', name: 'Women' },
  { file: 'bestsellers.html', name: 'Bestsellers' },
  { file: 'new-arrivals.html', name: 'NewArrivals' },
  { file: 'sale.html', name: 'Sale' },
  { file: 'product.html', name: 'Product' },
  { file: 'cart.html', name: 'Cart' }
];

pages.forEach(p => processFile(p.file, p.name));
