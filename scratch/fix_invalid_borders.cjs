const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix invalid border classes resulting from previous replacements
content = content.replace(/border-black\/10\/80/g, 'border-black/10');
content = content.replace(/border-black\/10\/60/g, 'border-black/10');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed invalid border classes');
