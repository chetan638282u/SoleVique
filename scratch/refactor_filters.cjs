const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'pages');

const pages = ['Men.jsx', 'Women.jsx', 'Bestsellers.jsx'];

pages.forEach(page => {
    let content = fs.readFileSync(path.join(srcDir, page), 'utf8');

    // Add imports if missing
    if (!content.includes('import SidebarFilter')) {
        content = content.replace("import { Link } from 'react-router-dom';", "import { Link } from 'react-router-dom';\nimport SidebarFilter from '../components/SidebarFilter';\nimport { products as globalProducts } from '../data/products';");
    }

    // Replace hardcoded allProducts with globalProducts logic
    if (page === 'Men.jsx') {
        const hardcodedStart = content.indexOf('const allProducts = [');
        const hardcodedEnd = content.indexOf('];', hardcodedStart) + 2;
        if (hardcodedStart !== -1) {
            content = content.substring(0, hardcodedStart) + 
                'const initialProducts = globalProducts.filter(p => p.categories?.includes("Men"));\n  const [filteredProducts, setFilteredProducts] = useState(initialProducts);\n' + 
                content.substring(hardcodedEnd);
        }
    } else if (page === 'Women.jsx') {
        const hardcodedStart = content.indexOf('const allProducts = [');
        const hardcodedEnd = content.indexOf('];', hardcodedStart) + 2;
        if (hardcodedStart !== -1) {
            content = content.substring(0, hardcodedStart) + 
                'const initialProducts = globalProducts.filter(p => p.categories?.includes("Women"));\n  const [filteredProducts, setFilteredProducts] = useState(initialProducts);\n' + 
                content.substring(hardcodedEnd);
        }
    } else if (page === 'Bestsellers.jsx') {
        const hardcodedStart = content.indexOf('const allProducts = [');
        const hardcodedEnd = content.indexOf('];', hardcodedStart) + 2;
        if (hardcodedStart !== -1) {
            content = content.substring(0, hardcodedStart) + 
                'const initialProducts = globalProducts;\n  const [filteredProducts, setFilteredProducts] = useState(initialProducts);\n' + 
                content.substring(hardcodedEnd);
        }
    }

    // Replace allProducts with filteredProducts for pagination
    content = content.replace(/allProducts\.length/g, 'filteredProducts.length');
    content = content.replace(/allProducts\.slice/g, 'filteredProducts.slice');

    // Replace the <aside> block with <SidebarFilter>
    // We need to carefully find the aside block
    const asideStart = content.indexOf('<aside');
    if (asideStart !== -1) {
        const asideEnd = content.indexOf('</aside>', asideStart) + 8;
        const replacement = `<div className="lg:col-span-3 sticky top-[100px] hidden lg:block">\n  <SidebarFilter allProducts={initialProducts} onFilterChange={setFilteredProducts} />\n</div>`;
        content = content.substring(0, asideStart) + replacement + content.substring(asideEnd);
    }

    // In Men.jsx/Women.jsx, we might also have to replace the exact aside class structure if it was different.
    // The indexOf('<aside') should catch it. Let's make sure Bestsellers uses <aside> too. Yes it does.

    fs.writeFileSync(path.join(srcDir, page), content, 'utf8');
});

console.log('Pages refactored to use SidebarFilter');
