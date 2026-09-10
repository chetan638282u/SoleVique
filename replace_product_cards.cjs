const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'pages');

try {
  const files = fs.readdirSync(directoryPath);

  files.forEach(file => {
    if (file.endsWith('.jsx')) {
      const filePath = path.join(directoryPath, file);
      let content = fs.readFileSync(filePath, 'utf8');

      // Add import if not present and there is a product mapping
      if (content.includes('to={`/product?id=') && !content.includes('ProductCard')) {
        content = content.replace(
          "import { Link",
          "import ProductCard from '../components/ProductCard';\nimport { Link"
        );
        // Sometimes it's just import { Link } from 'react-router-dom'; without other things, or we can just append it below react imports
        if (!content.includes("import ProductCard")) {
             content = content.replace(
              "import React",
              "import React from 'react';\nimport ProductCard from '../components/ProductCard';"
            );
        }
      }

      // Regex to match the entire Link block for a product card
      // It matches from <Link key={...} to={`/product?id=...`} ...> down to </Link>
      const linkRegex = /<Link\s+key=\{idx\}\s+to=\{\s*`\/product\?id=\$\{encodeURIComponent\(([^)]+)\)\}`\s*\}.*?className="([^"]+)"[\s\S]*?<\/Link>/g;
      
      content = content.replace(linkRegex, (match, productNameVar, className) => {
        // className might have group in it, ProductCard already adds flex flex-col cursor-pointer group
        // So we extract just the unique classes if any
        let extraClasses = className
          .replace('flex flex-col cursor-pointer group', '')
          .replace('flex flex-col group cursor-pointer', '')
          .trim();
        
        // Is it relatedProduct or product?
        let productVar = productNameVar.includes('relatedProduct') ? 'relatedProduct' : 'product';

        return `<ProductCard key={idx} product={${productVar}} className="${extraClasses}" />`;
      });

      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ProductCard in ${file}`);
    }
  });

  console.log("ProductCard replacement complete.");
} catch (error) {
  console.error("Error updating files:", error);
}
