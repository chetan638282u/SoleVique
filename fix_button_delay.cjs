const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'pages');

try {
  const files = fs.readdirSync(directoryPath);

  files.forEach(file => {
    if (file.endsWith('.jsx')) {
      const filePath = path.join(directoryPath, file);
      let content = fs.readFileSync(filePath, 'utf8');

      // The target is the Add to Cart/Bag button classes across the pages
      // Look for: opacity-0 lg:group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300
      // We will add delay logic to it.
      
      const targetRegex = /opacity-0 lg:group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300/g;
      const replacement = 'opacity-0 lg:group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 delay-[2000ms] lg:group-hover:delay-0 group-active:delay-0 focus:opacity-100 focus:delay-0';
      
      const updatedContent = content.replace(targetRegex, replacement);
      
      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Updated button delay in ${file}`);
      }
    }
  });

  console.log("Button delay update complete.");
} catch (error) {
  console.error("Error updating files:", error);
}
