const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Ensure import is added
if (!content.includes('import HeroSlideshow')) {
  // Find last import
  const lastImportIndex = content.lastIndexOf('import ');
  const insertIndex = content.indexOf('\n', lastImportIndex) + 1;
  content = content.slice(0, insertIndex) + "import HeroSlideshow from '../components/HeroSlideshow'\n" + content.slice(insertIndex);
}

// Replace hero-showcase section
const startTag = '<section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-black/10 hero-grid-pattern" data-purpose="hero-showcase">';
const endTag = '</section>';

const startIndex = content.indexOf(startTag);
if (startIndex !== -1) {
  // Find the closing tag of this section
  // It's the first </section> after startIndex
  let endIndex = content.indexOf(endTag, startIndex);
  if (endIndex !== -1) {
    endIndex += endTag.length;
    content = content.slice(0, startIndex) + '<HeroSlideshow />' + content.slice(endIndex);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Replaced hero section in Home.jsx');
