const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace product names and category names
    // className="text-sm text-brand-charcoal font-normal leading-snug mt-3"
    // with px-1
    content = content.replace(
        /className="text-sm text-brand-charcoal font-normal leading-snug mt-3"/g, 
        'className="text-sm text-brand-charcoal font-normal leading-snug mt-3 px-1"'
    );
    
    // Replace shop by category names
    content = content.replace(
        /className="text-sm text-brand-charcoal font-normal leading-snug mt-3 lowercase"/g, 
        'className="text-sm text-brand-charcoal font-normal leading-snug mt-3 px-1 lowercase"'
    );

    // Replace product prices
    // className="text-[13px] text-black font-medium mt-0.5"
    content = content.replace(
        /className="text-\[13px\] text-black font-medium mt-0\.5"/g, 
        'className="text-[13px] text-black font-medium mt-0.5 px-1"'
    );

    fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Fixed text alignment on all product cards');
