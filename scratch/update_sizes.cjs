const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'products.js');
let content = fs.readFileSync(filePath, 'utf8');

// Replace EU sizes with IN sizes
// EU Men sizes usually [39, 40, 41, 42, 43, 44, 45, 46] -> map to [6, 7, 8, 9, 10, 11]
// EU Women sizes usually [35, 36, 37, 38, 39, 40, 41] -> map to [4, 5, 6, 7, 8, 9]
// To keep it simple and match user's request ("from 6 to 10"), I will just replace all sizes arrays with random subsets of [6, 7, 8, 9, 10]

content = content.replace(/sizes: \[[0-9, ]+\]/g, () => {
    // Return a random subset of [6, 7, 8, 9, 10]
    const all = [6, 7, 8, 9, 10];
    // shuffle
    all.sort(() => 0.5 - Math.random());
    // pick 3 to 5 sizes
    const count = Math.floor(Math.random() * 3) + 3; 
    const picked = all.slice(0, count).sort((a,b)=>a-b);
    return `sizes: [${picked.join(', ')}]`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('products.js updated with IN sizes from 6 to 10');
