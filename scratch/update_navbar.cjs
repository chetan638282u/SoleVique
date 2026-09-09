const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'Navbar.jsx');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('import GlobalSearch')) {
  content = content.replace(
    "import { useCart } from '../context/CartContext';",
    "import { useCart } from '../context/CartContext';\nimport GlobalSearch from './GlobalSearch';"
  );
}

const searchButtonRegex = /<button aria-label="Search Catalog"[\s\S]*?<\/button>/;
content = content.replace(searchButtonRegex, '<GlobalSearch />');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Navbar updated with GlobalSearch component');
