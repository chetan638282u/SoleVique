const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'pages');
const pages = ['Home.jsx', 'Men.jsx', 'Women.jsx', 'Bestsellers.jsx', 'NewArrivals.jsx', 'Sale.jsx'];

pages.forEach(page => {
    let pagePath = path.join(srcDir, page);
    if (!fs.existsSync(pagePath)) return;
    
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Replace the exact phrase
    let newContent = content.replace(/Get 10% Off Your First Order/g, 'Get 10% Off On Your First Order');
    
    if (newContent !== content) {
        fs.writeFileSync(pagePath, newContent, 'utf8');
        console.log(`Updated ${page}`);
    }
});
