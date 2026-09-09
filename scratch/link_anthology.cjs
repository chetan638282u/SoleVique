const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace Women Anthology div with Link
content = content.replace(
    /<div className="lg:col-span-7 group relative rounded-2xl overflow-hidden border border-black\/10 bg-white min-h-\[500px\] lg:min-h-\[580px\] flex flex-col justify-between">([\s\S]*?)<div className="lg:col-span-5 flex flex-col gap-6">/,
    '<Link to="/women" className="lg:col-span-7 group relative rounded-2xl overflow-hidden border border-black/10 bg-white min-h-[500px] lg:min-h-[580px] flex flex-col justify-between block">$1</Link><div className="lg:col-span-5 flex flex-col gap-6">'
);

// Replace Bestsellers Anthology div with Link
content = content.replace(
    /<div className="group relative rounded-2xl overflow-hidden border border-black\/10 bg-brand-charcoal min-h-\[270px\] lg:min-h-\[280px\] flex-1 flex flex-col justify-between">([\s\S]*?)<img alt="Bestsellers Footwear Campaign"([\s\S]*?)<\/h3>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/,
    '<Link to="/bestsellers" className="group relative rounded-2xl overflow-hidden border border-black/10 bg-brand-charcoal min-h-[270px] lg:min-h-[280px] flex-1 flex flex-col justify-between block">$1<img alt="Bestsellers Footwear Campaign"$2</h3>$3</div>\n</div>\n</Link>'
);

// Replace Men Anthology div with Link
content = content.replace(
    /<div className="group relative rounded-2xl overflow-hidden border border-black\/10 bg-brand-charcoal min-h-\[270px\] lg:min-h-\[280px\] flex-1 flex flex-col justify-between">([\s\S]*?)<img alt="Men's Footwear Campaign"([\s\S]*?)<\/h3>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/,
    '<Link to="/men" className="group relative rounded-2xl overflow-hidden border border-black/10 bg-brand-charcoal min-h-[270px] lg:min-h-[280px] flex-1 flex flex-col justify-between block">$1<img alt="Men\'s Footwear Campaign"$2</h3>$3</div>\n</div>\n</Link>'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Linked Anthology cards');
