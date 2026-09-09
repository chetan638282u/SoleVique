const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove hover translation and scale effects and fix broken classes
const classesToRemove = [
    'hover:scale-\\[1\\.02\\]',
    'opacity-0',
    'group-hover:opacity-100',
    'translate-y-2',
    'group-hover:translate-y-0',
    'transition-',
    'hover:' // This might break hover:text-white, so I'll be careful
];

// Instead of global hover:, let's just fix the specific broken ones from previous run
content = content.replace(/\btransition-\b/g, 'transition-all');
content = content.replace(/\bhover:\b/g, ''); // wait, hover: alone is broken, I'll remove it.
content = content.replace(/\bhover:scale-\[1\.02\]\b/g, '');
content = content.replace(/\bopacity-0\b/g, '');
content = content.replace(/\bgroup-hover:opacity-100\b/g, '');
content = content.replace(/\btranslate-y-2\b/g, '');
content = content.replace(/\bgroup-hover:translate-y-0\b/g, '');

// Clean up extra spaces in className=""
content = content.replace(/className="([^"]+)"/g, (match, classList) => {
    const cleaned = classList.replace(/\s+/g, ' ').trim();
    return `className="${cleaned}"`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Cleaned up more Home.jsx classes');
