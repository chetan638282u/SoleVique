const fs = require('fs');
const path = require('path');

const files = [
    'Men.jsx',
    'Women.jsx',
    'Sale.jsx',
    'NewArrivals.jsx',
    'Bestsellers.jsx'
];

files.forEach(file => {
    const filePath = path.join(__dirname, '..', 'src', 'pages', file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace container max-width and padding
    content = content.replace(
        /className="w-full max-w-\[1360px\] mx-auto px-margin-mobile lg:px-margin-desktop/g,
        'className="w-full mx-auto px-[15px]'
    );
    // There is another section at the top of these files (the header)
    content = content.replace(
        /className="max-w-\[1360px\] mx-auto px-margin-mobile lg:px-margin-desktop"/g,
        'className="w-full mx-auto px-[15px]"'
    );

    // Replace the grid gap
    content = content.replace(
        /className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"/g,
        'className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10px]"'
    );

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Updated spacing in all catalog pages.");
