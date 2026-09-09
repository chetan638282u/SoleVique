const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walkDir(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const jsxFiles = walkDir(srcDir);

jsxFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Fix onsubmit strings
    content = content.replace(/onsubmit="return false;"/g, 'onSubmit={(e) => e.preventDefault()}');
    content = content.replace(/onsubmit="event.preventDefault\(\)"/g, 'onSubmit={(e) => e.preventDefault()}');
    content = content.replace(/onsubmit="event.preventDefault\(\);"/g, 'onSubmit={(e) => e.preventDefault()}');
    content = content.replace(/onsubmit="event.preventDefault\(\); alert\('([^']+)'\);"/g, "onSubmit={(e) => { e.preventDefault(); alert('$1'); }}");

    // Fix <Link href="..."> to <Link to="...">
    // A bit dangerous to regex all hrefs, but if it's inside <Link ... href=
    // We can do it safely by just replacing href= with to= on lines containing <Link
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('<Link ') && lines[i].includes('href=')) {
            lines[i] = lines[i].replace(/href=/g, 'to=');
        }
    }
    content = lines.join('\n');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed', file);
    }
});
