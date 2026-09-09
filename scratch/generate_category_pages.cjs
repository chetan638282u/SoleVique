const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'src', 'pages');
const template = fs.readFileSync(path.join(pagesDir, 'Men.jsx'), 'utf8');

const categories = ['Running', 'Casual', 'Formal', 'Sandals', 'Sports'];

categories.forEach(cat => {
  let content = template.replace(
    `const initialProducts = useMemo(() => globalProducts.filter(p => p.categories?.includes("Men")), []);`,
    `const initialProducts = useMemo(() => globalProducts.filter(p => p.categories?.includes("${cat}")), []);`
  );
  
  content = content.replace(/export default function Men\(\)/, `export default function ${cat}()`);
  content = content.replace(/Men's Footwear/g, `${cat} Footwear`);
  
  fs.writeFileSync(path.join(pagesDir, `${cat}.jsx`), content, 'utf8');
});

// Update App.jsx
const appPath = path.join(__dirname, '..', 'src', 'App.jsx');
let appContent = fs.readFileSync(appPath, 'utf8');

// Add imports
categories.forEach(cat => {
  if (!appContent.includes(`import ${cat} from`)) {
    appContent = appContent.replace(
      "import Men from './pages/Men'",
      `import Men from './pages/Men'\nimport ${cat} from './pages/${cat}'`
    );
  }
});

// Add routes
categories.forEach(cat => {
  if (!appContent.includes(`path="${cat.toLowerCase()}"`)) {
    appContent = appContent.replace(
      '<Route path="men" element={<Men />} />',
      `<Route path="men" element={<Men />} />\n          <Route path="${cat.toLowerCase()}" element={<${cat} />} />`
    );
  }
});

fs.writeFileSync(appPath, appContent, 'utf8');

// Update Home.jsx links
const homePath = path.join(__dirname, '..', 'src', 'pages', 'Home.jsx');
let homeContent = fs.readFileSync(homePath, 'utf8');

// Shop by Category section has <Link className="flex flex-col cursor-pointer group" to="/men">
// and <p className="text-sm text-brand-charcoal font-semibold leading-snug mt-3 px-1 text-center capitalize">Running</p>
// We need to replace the `to="/men"` with the respective category for each block.

const replaceLinkForCategory = (categoryText, pathName) => {
    // Find the link block for this category. We can use a regex that matches the <Link to="...">... <p>CategoryText</p>
    const regex = new RegExp(`(<Link [^>]*to=")[\/]men("[^>]*>[\\s\\S]*?<p[^>]*>${categoryText}</p>\\s*</Link>)`, 'i');
    homeContent = homeContent.replace(regex, `$1/${pathName}$2`);
};

categories.forEach(cat => {
  replaceLinkForCategory(cat, cat.toLowerCase());
});

fs.writeFileSync(homePath, homeContent, 'utf8');

console.log('Pages generated and linked successfully.');
