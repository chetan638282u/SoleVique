const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'pages');

try {
  const files = fs.readdirSync(directoryPath);

  files.forEach(file => {
    if (file.endsWith('.jsx')) {
      const filePath = path.join(directoryPath, file);
      let content = fs.readFileSync(filePath, 'utf8');

      // Replace product name paragraph to include truncate
      // Find: <p className="...">{product.name}</p>
      // Make sure we only target product.name
      
      const updatedContent = content.replace(
        /(<p className="[^"]*)(">\s*\{product\.name\}\s*<\/p>)/g,
        (match, p1, p2) => {
          if (!p1.includes('truncate')) {
            return `${p1} truncate${p2}`;
          }
          return match;
        }
      );
      
      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Added truncate to ${file}`);
      }
    }
  });

  console.log("Truncate update complete.");
} catch (error) {
  console.error("Error updating files:", error);
}
