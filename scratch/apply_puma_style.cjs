const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(fullPath));
        } else if (fullPath.endsWith('.jsx')) {
            results.push(fullPath);
        }
    });
    return results;
}

const files = walkDir(srcDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Standard product cards across Home, Men, Women, Sale, NewArrivals, Bestsellers
    // w-full aspect-square rounded-xl bg-white border border-black/10
    content = content.replace(/rounded-xl\s+bg-white\s+border\s+border-black\/10/g, "bg-[#F4F4F4]");
    
    // 2. Product thumbnails in Product.jsx
    // w-full aspect-square rounded-2xl bg-white
    content = content.replace(/rounded-2xl\s+bg-white/g, "bg-[#F4F4F4]");
    
    // 3. Main product image in Product.jsx
    // bg-surface-container-lowest rounded-xl shadow-md
    content = content.replace(/bg-surface-container-lowest\s+rounded-xl\s+shadow-md/g, "bg-[#F4F4F4]");
    
    // 4. Shop by category hover states in Home.jsx
    // group-hover:border-brand-ember/50
    content = content.replace(/group-hover:border-brand-ember\/50/g, "");

    // 5. Global search tiny thumbnails
    // rounded-lg bg-neutral-100
    content = content.replace(/rounded-lg\s+bg-neutral-100/g, "bg-[#F4F4F4]");
    content = content.replace(/group-hover:bg-brand-ember\/5/g, "group-hover:bg-[#EAEAEA]");

    fs.writeFileSync(file, content, 'utf8');
});

console.log('Applied #F4F4F4 square styling to all product cards');
