const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove AI template style floating effects from images
    content = content.replace(/\bgroup-hover:scale-105\b/g, '');
    content = content.replace(/\btransition-transform\b/g, '');
    content = content.replace(/\bduration-300\b/g, '');
    content = content.replace(/\bduration-500\b/g, '');
    content = content.replace(/\bduration-700\b/g, '');
    content = content.replace(/\bease-out\b/g, '');
    
    // Also quick view float effects
    content = content.replace(/\bopacity-0\b/g, '');
    content = content.replace(/\bgroup-hover:opacity-100\b/g, '');
    content = content.replace(/\btranslate-y-2\b/g, '');
    content = content.replace(/\bgroup-hover:translate-y-0\b/g, '');
    
    content = content.replace(/\bhover:scale-\[1\.02\]\b/g, '');

    // Clean up extra spaces in className=""
    content = content.replace(/className="([^"]+)"/g, (match, classList) => {
        const cleaned = classList.replace(/\s+/g, ' ').trim();
        return `className="${cleaned}"`;
    });

    fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Cleaned up all JSX files floating effects');
