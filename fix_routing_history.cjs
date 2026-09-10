const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'pages');

try {
  const files = fs.readdirSync(directoryPath);

  files.forEach(file => {
    if (file.endsWith('.jsx')) {
      const filePath = path.join(directoryPath, file);
      let content = fs.readFileSync(filePath, 'utf8');

      // The regex captures the variable representing the product name, e.g. product.name or relatedProduct.name
      const regex = /to="\/product"\s+state=\{\{\s*name:\s*([^,]+),/g;
      
      const updatedContent = content.replace(regex, (match, p1) => {
        return `to={\`/product?id=\${encodeURIComponent(${p1})}\`} state={{ name: ${p1},`;
      });
      
      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Updated routing history fixes in ${file}`);
      }
    }
  });

  console.log("Routing history fix complete.");
} catch (error) {
  console.error("Error updating files:", error);
}
