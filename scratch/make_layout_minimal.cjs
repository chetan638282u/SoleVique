const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'pages');

const pages = ['Men.jsx', 'Women.jsx', 'Bestsellers.jsx'];

pages.forEach(page => {
    let content = fs.readFileSync(path.join(srcDir, page), 'utf8');

    // For Men.jsx, the header section is:
    // <section className="w-full bg-surface-container-low pb-space-2xl pt-space-lg">
    // ... up to </section> before <section className="w-full sticky top-20...
    
    if (page === 'Men.jsx') {
        const headerStart = content.indexOf('<section className="w-full bg-surface-container-low');
        const stickyStart = content.indexOf('<section className="w-full sticky top-20');
        
        if (headerStart !== -1 && stickyStart !== -1) {
            const replacement = `
<section className="w-full bg-white pt-8 pb-4">
<div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop">
<h1 className="font-architectural text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight uppercase">
            Men's Footwear & Silhouettes
          </h1>
</div>
</section>
`;
            content = content.substring(0, headerStart) + replacement + content.substring(stickyStart);
        }
    } else if (page === 'Women.jsx') {
        const headerStart = content.indexOf('<section className="w-full bg-surface py-space-xl');
        const filterSectionStart = content.indexOf('<section className="w-full bg-background py-space-xl">');
        
        if (headerStart !== -1 && filterSectionStart !== -1) {
            const replacement = `
<section className="w-full bg-white pt-8 pb-4">
<div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop">
<h1 className="font-architectural text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight uppercase">
            Women's Footwear & Silhouettes
          </h1>
</div>
</section>
`;
            content = content.substring(0, headerStart) + replacement + content.substring(filterSectionStart);
        }
    } else if (page === 'Bestsellers.jsx') {
        const headerStart = content.indexOf('<section className="w-full bg-surface-container-low');
        const filterSectionStart = content.indexOf('<section className="w-full py-space-2xl">');
        
        if (headerStart !== -1 && filterSectionStart !== -1) {
            const replacement = `
<section className="w-full bg-white pt-8 pb-4">
<div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop">
<h1 className="font-architectural text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight uppercase">
            The Bestsellers & Icons
          </h1>
</div>
</section>
`;
            content = content.substring(0, headerStart) + replacement + content.substring(filterSectionStart);
        }
    }

    // Now, we need to reduce the padding on the section that holds the TopBarFilter
    content = content.replace(/<section className="w-full max-w-\[1360px\] mx-auto px-margin-mobile lg:px-margin-desktop py-space-2xl">/g, '<section className="w-full max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop pb-12 pt-2">');
    content = content.replace(/<section className="w-full bg-background py-space-xl">/g, '<section className="w-full bg-white pb-12 pt-2">');
    content = content.replace(/<section className="w-full py-space-2xl">/g, '<section className="w-full bg-white pb-12 pt-2">');

    // Also get rid of any empty sticky sections or empty sections that might add space
    content = content.replace(/<section className="w-full sticky top-20 z-40 bg-surface\/90 backdrop-blur-md shadow-sm">\s*<\/section>/g, '');
    content = content.replace(/<section className="w-full bg-surface-container py-space-sm">\s*<\/section>/g, '');
    content = content.replace(/<section className="w-full bg-surface py-space-sm">\s*<\/section>/g, '');

    fs.writeFileSync(path.join(srcDir, page), content, 'utf8');
});

console.log('Removed descriptions, breadcrumbs, and tags. Made layout minimal.');
