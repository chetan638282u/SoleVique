const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'pages');

try {
  const files = fs.readdirSync(directoryPath);

  files.forEach(file => {
    if (file.endsWith('.jsx')) {
      const filePath = path.join(directoryPath, file);
      let content = fs.readFileSync(filePath, 'utf8');

      const target = 'bg-[#F4F4F4] overflow-hidden flex items-center justify-center p-6 relative';
      const replacement = 'bg-[#F4F4F4] overflow-hidden flex items-center justify-center p-2 md:p-6 relative';
      
      const updatedContent = content.replace(new RegExp(target.replace(/\[/g, '\\[').replace(/\]/g, '\\]'), 'g'), replacement);
      
      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Updated padding in ${file}`);
      }
    }
  });

  console.log("Padding update complete.");
} catch (error) {
  console.error("Error updating files:", error);
}
