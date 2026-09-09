const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the specific invalid classes with the hover classes
    const oldClass = 'group-opacity-100 group-translate-y-0';
    const newClass = 'opacity-0 group-hover:opacity-100 transition-opacity duration-300';
    
    if (content.includes(oldClass)) {
        content = content.replace(new RegExp(oldClass, 'g'), newClass);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
