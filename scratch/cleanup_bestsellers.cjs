const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'Bestsellers.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove hover translation and scale effects
content = content.replace(/\bgroup-hover:scale-105\b/g, '');
content = content.replace(/\bhover:scale-105\b/g, '');
content = content.replace(/\bopacity-0\b/g, '');
content = content.replace(/\bgroup-hover:opacity-100\b/g, '');
content = content.replace(/\btranslate-y-2\b/g, '');
content = content.replace(/\bgroup-hover:translate-y-0\b/g, '');
content = content.replace(/\btransition-transform\b/g, '');
content = content.replace(/\btransition-all\b/g, '');
content = content.replace(/\bduration-300\b/g, '');
content = content.replace(/\bduration-500\b/g, '');
content = content.replace(/\bshadow-lg\b/g, '');
content = content.replace(/\bshadow-xl\b/g, '');
content = content.replace(/\bhover:shadow-xl\b/g, '');
content = content.replace(/\bhover:shadow-lg\b/g, '');
content = content.replace(/\bhover:-translate-y-1\b/g, '');
content = content.replace(/\bhover:-translate-y-1\.5\b/g, '');

// Clean up extra spaces in className=""
content = content.replace(/className="([^"]+)"/g, (match, classList) => {
    const cleaned = classList.replace(/\s+/g, ' ').trim();
    return `className="${cleaned}"`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Cleaned up Bestsellers.jsx');
