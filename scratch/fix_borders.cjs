const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace border-brand-border/80 and border-brand-border and border-brand-ember/60 with border-black/10 on the anthology cards and shop by category cards
// Shop by category Link:
content = content.replace(/\bborder-brand-border\b/g, 'border-black/10');
content = content.replace(/\bborder-brand-border\/80\b/g, 'border-black/10');
content = content.replace(/\bborder-brand-ember\/60\b/g, 'border-black/10');
content = content.replace(/\bborder-brand-ember\b/g, 'border-black/10'); // Fix any other ember borders

// Clean up duplicate border-black/10
content = content.replace(/border-black\/10\s+border-black\/10/g, 'border-black/10');
content = content.replace(/border border-black\/10 border-black\/10/g, 'border border-black/10');
content = content.replace(/border-black\/10 border-black\/10/g, 'border-black/10');

// Clean up double bg-white from previous script
content = content.replace(/bg-white\/70 bg-white/g, 'bg-white');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed colored boundaries');
