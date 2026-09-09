const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'pages');

// For Sale.jsx
let salePath = path.join(srcDir, 'Sale.jsx');
if (fs.existsSync(salePath)) {
    let content = fs.readFileSync(salePath, 'utf8');
    const descRegex = /<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">\s*Curated seasonal silhouettes and archival drops crafted from supple Tuscan leathers and ergonomic zero-drop soles, now offered at up to 40% off\. Handcrafted in Civitanova Marche, Italy\.\s*<\/p>/;
    content = content.replace(descRegex, '');
    
    // Also remove the "LIMITED-TIME ATELIER PRIVILEGE" box since it's basically a description/promo thing that clutters the UI if they want it ultra minimal, but wait, the user said "remove the description of our kival sale". I will just remove the main description text paragraph.
    fs.writeFileSync(salePath, content, 'utf8');
}

// For NewArrivals.jsx
let newArrivalsPath = path.join(srcDir, 'NewArrivals.jsx');
if (fs.existsSync(newArrivalsPath)) {
    let content = fs.readFileSync(newArrivalsPath, 'utf8');
    const descRegex = /<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">\s*Discover the latest zero-drop anatomical silhouettes from our Civitanova Marche atelier\. Engineered with proprietary Italian hides and ultra-minimalist geometries for natural alignment\.\s*<\/p>/;
    content = content.replace(descRegex, '');
    fs.writeFileSync(newArrivalsPath, content, 'utf8');
}

console.log('Descriptions removed from Sale and NewArrivals');
