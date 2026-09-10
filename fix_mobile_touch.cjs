const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'pages');

try {
  const files = fs.readdirSync(directoryPath);

  files.forEach(file => {
    if (file.endsWith('.jsx')) {
      const filePath = path.join(directoryPath, file);
      let content = fs.readFileSync(filePath, 'utf8');

      // 1. Change active:opacity-100 to group-active:opacity-100
      let updatedContent = content.replace(/active:opacity-100/g, 'group-active:opacity-100');
      
      // 2. Add pointer-events-none and select-none to product images to prevent mobile selection/save dialog
      // The images usually have: className="w-full h-full object-contain" or something similar
      updatedContent = updatedContent.replace(/className="([^"]*w-full h-full object-contain[^"]*)"/g, (match, p1) => {
        if (!p1.includes('pointer-events-none')) {
          return `className="${p1} pointer-events-none select-none"`;
        }
        return match;
      });

      // Just to be sure we hit the main grid ones which might have slightly different classes:
      updatedContent = updatedContent.replace(/className="w-full h-full object-contain mix-blend-multiply"/g, 'className="w-full h-full object-contain mix-blend-multiply pointer-events-none select-none"');
      updatedContent = updatedContent.replace(/className="w-full h-full object-contain mix-blend-multiply drop-shadow-\[0_20px_25px_rgba\(0,0,0,0.12\)\]"/g, 'className="w-full h-full object-contain mix-blend-multiply drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] pointer-events-none select-none"');

      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Updated mobile active state and selection in ${file}`);
      }
    }
  });

  console.log("Mobile active state and selection fix complete.");
} catch (error) {
  console.error("Error updating files:", error);
}
