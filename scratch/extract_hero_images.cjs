const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs');

const zips = [
    "C:\\Users\\Chetan singh\\Desktop\\SoleVique Shoe images\\stitch_solevique_premium_footwear_storefront (1).zip",
    "C:\\Users\\Chetan singh\\Desktop\\SoleVique Shoe images\\stitch_solevique_premium_footwear_storefront (2).zip",
    "C:\\Users\\Chetan singh\\Desktop\\SoleVique Shoe images\\stitch_solevique_premium_footwear_storefront.zip"
];

const destDir = path.join(__dirname, '..', 'public', 'images', 'hero_slideshow');
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

zips.forEach((zipPath, index) => {
    try {
        const zip = new AdmZip(zipPath);
        // We expect an image inside. Let's just find the first image in each zip and rename it
        const entries = zip.getEntries();
        for (let entry of entries) {
            if (!entry.isDirectory && (entry.name.endsWith('.png') || entry.name.endsWith('.jpg') || entry.name.endsWith('.webp') || entry.name.endsWith('.jpeg'))) {
                const ext = path.extname(entry.name);
                const targetName = `hero_slide_${index + 1}${ext}`;
                const fileData = entry.getData();
                fs.writeFileSync(path.join(destDir, targetName), fileData);
                console.log(`Extracted ${targetName} from ${path.basename(zipPath)}`);
                break; // Just need one image per zip
            }
        }
    } catch (err) {
        console.error(`Error reading ${zipPath}:`, err);
    }
});
