const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// The categories to replace:
// Running, Casual, Formal, Sandals, Sports

const replacements = [
    {
        name: 'Running',
        src: '/images/men/Aeroknit Minimal Runner.png'
    },
    {
        name: 'Casual',
        src: '/images/men/Slate Minimal Court Sneaker.png'
    },
    {
        name: 'Formal',
        src: '/images/men/Oxblood Double Monk Strap.png'
    },
    {
        name: 'Sandals',
        src: '/images/women/Architectural Cross Slide.png'
    },
    {
        name: 'Sports',
        src: '/images/men/Technical Trail Runner 02.png'
    }
];

// In the code, each category looks something like this:
// <img alt="Running Category" className="w-full h-full object-contain mix-blend-multiply transition-" src="https://lh3.googleusercontent.com/..." />
// We will replace the src URL and remove mix-blend-multiply

replacements.forEach(cat => {
    const altText = `alt="${cat.name} Category"`;
    
    // Find the img tag with this alt text
    const imgRegex = new RegExp(`<img alt="${cat.name} Category" className="([^"]+)" src="([^"]+)" />`, 'g');
    
    content = content.replace(imgRegex, (match, className, src) => {
        // Remove mix-blend-multiply
        const newClassName = className.replace('mix-blend-multiply', '').trim();
        return `<img alt="${cat.name} Category" className="${newClassName}" src="${cat.src}" />`;
    });
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Replaced category images in Home.jsx');
