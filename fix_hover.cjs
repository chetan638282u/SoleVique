const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'pages');

try {
  const files = fs.readdirSync(directoryPath);

  files.forEach(file => {
    if (file.endsWith('.jsx')) {
      const filePath = path.join(directoryPath, file);
      let content = fs.readFileSync(filePath, 'utf8');

      // Replace group-hover:opacity-100 with lg:group-hover:opacity-100 active:opacity-100
      const updatedContent = content.replace(
        /group-hover:opacity-100/g,
        'lg:group-hover:opacity-100 active:opacity-100'
      );
      
      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Updated hover classes in ${file}`);
      }
    }
  });

  console.log("Hover class update complete.");
} catch (error) {
  console.error("Error updating files:", error);
}
