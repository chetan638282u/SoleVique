const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'pages');

try {
  const files = fs.readdirSync(directoryPath);

  files.forEach(file => {
    if (file.endsWith('.jsx')) {
      const filePath = path.join(directoryPath, file);
      let content = fs.readFileSync(filePath, 'utf8');

      // Replace grid-cols-1 sm:grid-cols-2 with grid-cols-2 sm:grid-cols-3
      // Actually, just grid-cols-2 lg:grid-cols-4 might be best, but let's do grid-cols-2 md:grid-cols-3 lg:grid-cols-4
      // Let's replace 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' with 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      const updatedContent = content.replace(/grid-cols-1 sm:grid-cols-2 lg:grid-cols-4/g, 'grid-cols-2 lg:grid-cols-4');
      
      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Updated grid layout in ${file}`);
      }
    }
  });

  console.log("Grid layout update complete.");
} catch (error) {
  console.error("Error updating files:", error);
}
