const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const srcDir = './old_html';
const content = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');
const $ = cheerio.load(content);

$('[style*="background-image"]').each((i, el) => {
  const style = $(el).attr('style');
  const className = $(el).attr('class');
  console.log("Class:", className);
  console.log("Style:", style);
  
  const escapedClass = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const classRegex = new RegExp(`className="${escapedClass}"`, 'g');
  console.log("Regex would be:", classRegex);
  
  const jsxContent = fs.readFileSync('./src/pages/Home.jsx', 'utf8');
  const match = jsxContent.match(classRegex);
  console.log("JSX Match?", match ? "YES" : "NO");
});
