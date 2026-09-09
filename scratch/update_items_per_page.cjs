const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'pages');

const pages = ['Men.jsx', 'Women.jsx', 'Bestsellers.jsx'];

pages.forEach(page => {
    let content = fs.readFileSync(path.join(srcDir, page), 'utf8');

    // Replace itemsPerPage
    content = content.replace(/const itemsPerPage = \d+;/g, 'const itemsPerPage = 12;');

    fs.writeFileSync(path.join(srcDir, page), content, 'utf8');
});

console.log('Updated itemsPerPage to 12');
