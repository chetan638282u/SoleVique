const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'pages');

const pages = ['Men.jsx', 'Women.jsx', 'Bestsellers.jsx'];

pages.forEach(page => {
    let content = fs.readFileSync(path.join(srcDir, page), 'utf8');

    // Replace lg:grid-cols-3 with lg:grid-cols-4
    content = content.replace(/lg:grid-cols-3/g, 'lg:grid-cols-4');

    fs.writeFileSync(path.join(srcDir, page), content, 'utf8');
});

console.log('Updated grid columns to 4');
