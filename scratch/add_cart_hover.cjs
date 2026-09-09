const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // The button class pattern might look like:
    // className="absolute bottom-3 left-3 right-3 bg-brand-black text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2"
    // We want to make sure it has 'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
    
    // Find all <button className="..." ...>Add to Cart</button>
    // This regex matches the Add to Cart button precisely.
    const buttonRegex = /(<button className=")([^"]+)(" type="button">\s*Add to Cart\s*<\/button>)/g;
    
    let modified = false;
    content = content.replace(buttonRegex, (match, p1, p2, p3) => {
        let classes = p2;
        // if it already has the hover effect, skip
        if (!classes.includes('group-hover:opacity-100')) {
            classes += ' opacity-0 group-hover:opacity-100 transition-opacity duration-300';
            modified = true;
        }
        return p1 + classes + p3;
    });
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated hover classes in ${file}`);
    }
});
