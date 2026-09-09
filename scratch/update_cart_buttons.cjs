const fs = require('fs');
const path = require('path');

const files = [
    'Men.jsx',
    'Women.jsx',
    'Bestsellers.jsx',
    'NewArrivals.jsx',
    'Sale.jsx',
    'Home.jsx'
];

files.forEach(file => {
    const filePath = path.join(__dirname, '..', 'src', 'pages', file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Import useCart if not exists
    if (!content.includes('useCart')) {
        content = content.replace(
            "import { Link } from 'react-router-dom';",
            "import { Link } from 'react-router-dom';\nimport { useCart } from '../context/CartContext';"
        );
    }

    // 2. Inject const { addToCart } = useCart(); at the top of the component
    const componentRegex = new RegExp(`export default function ${file.replace('.jsx', '')}\\(\\) {`);
    if (!content.includes('const { addToCart } = useCart();')) {
        content = content.replace(
            componentRegex,
            `export default function ${file.replace('.jsx', '')}() {\n  const { addToCart } = useCart();`
        );
    }

    // 3. Replace the button
    // It currently looks like:
    // <button className="..." type="button" onClick={(e) => e.preventDefault()}>
    //       Add to Cart
    //     </button>
    // OR
    // <button className="..." type="button">
    //       Add to Cart
    //     </button>
    // Note: the button could be slightly different across files due to class names.

    content = content.replace(
        /onClick=\{\(e\) => e\.preventDefault\(\)\}>\s*Add to Cart\s*<\/button>/g,
        `onClick={(e) => { e.preventDefault(); addToCart(product, 1, product.sizes?.[0] || '8'); }}>Add to Bag</button>`
    );
    
    content = content.replace(
        /type="button">\s*Add to Cart\s*<\/button>/g,
        `type="button" onClick={(e) => { e.preventDefault(); addToCart(product, 1, product.sizes?.[0] || '8'); }}>Add to Bag</button>`
    );

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Cart buttons updated successfully.');
