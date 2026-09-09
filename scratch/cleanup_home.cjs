const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove hover translation and scale effects
const classesToRemove = [
    'hover:-translate-y-1.5',
    'hover:-translate-y-1',
    'hover:-translate-y-0.5',
    'group-hover:scale-105',
    'hover:scale-105',
    'hover:shadow-xl',
    'hover:shadow-lg',
    'hover:shadow-2xl',
    'shadow-xl',
    'shadow-sm',
    'shadow-lg',
    'shadow-md',
    'shadow-brand-ember/20',
    'hover:shadow-brand-ember/30',
    'transform',
    'transition-transform',
    'transition-all',
    'duration-300',
    'duration-500',
    'duration-700',
    'ease-out'
];

classesToRemove.forEach(cls => {
    // Replace the class with word boundaries to avoid partial matches
    // But since it's tailwind, spaces around it or quotes
    const regex = new RegExp(`\\b${cls.replace(/\./g, '\\.')}\\b`, 'g');
    content = content.replace(regex, '');
});

// Clean up extra spaces in className=""
content = content.replace(/className="([^"]+)"/g, (match, classList) => {
    const cleaned = classList.replace(/\s+/g, ' ').trim();
    return `className="${cleaned}"`;
});

// Remove style count strings like "14 Styles", "22 Styles" in Shop by Category
content = content.replace(/<span className="text-\[11px\] font-mono uppercase tracking-wider text-brand-muted">\d+ Styles<\/span>/g, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Cleaned up Home.jsx');
