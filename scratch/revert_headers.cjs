const fs = require('fs');
const path = require('path');

const files = [
    'Men.jsx',
    'Women.jsx',
    'Bestsellers.jsx',
    'NewArrivals.jsx',
    'Sale.jsx'
];

files.forEach(file => {
    const filePath = path.join(__dirname, '..', 'src', 'pages', file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Revert the first occurrence (which is the header container)
    content = content.replace(
        '<div className="w-full mx-auto px-[15px]">',
        '<div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop">'
    );

    // Also fix the grid-cols in NewArrivals and Sale to have 4 items per row
    if (file === 'NewArrivals.jsx' || file === 'Sale.jsx') {
        content = content.replace(
            'className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]"',
            'className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10px]"'
        );
    }

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Reverted headers and fixed grids.");
