const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

// 1. Fix TopBarFilter.jsx
let topBarPath = path.join(srcDir, 'components', 'TopBarFilter.jsx');
let topBarContent = fs.readFileSync(topBarPath, 'utf8');
topBarContent = topBarContent.replace(
    '<div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-6">',
    '<div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop flex flex-wrap items-center justify-between gap-4 w-full">'
);
// Also remove px-margin-mobile lg:px-margin-desktop from TopBarFilter inner div if we are going to remove it from the parent? Wait, the parent had it. If we move TopBarFilter OUTSIDE the parent max-w container, TopBarFilter needs to have the EXACT SAME max-w and padding as the grid so the buttons align perfectly with the grid edges.
// Yes, `<div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop flex flex-wrap items-center justify-between gap-4 w-full">` does exactly that.
fs.writeFileSync(topBarPath, topBarContent, 'utf8');

// 2. Fix Men.jsx, Women.jsx, Bestsellers.jsx
const pages = ['Men.jsx', 'Women.jsx', 'Bestsellers.jsx'];
pages.forEach(page => {
    let pagePath = path.join(srcDir, 'pages', page);
    let content = fs.readFileSync(pagePath, 'utf8');

    // Currently the structure is:
    // <section className="w-full max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop pb-12 pt-2">
    // <div className="flex flex-col w-full items-start">
    // <TopBarFilter allProducts={initialProducts} onFilterChange={setFilteredProducts} />
    
    // OR
    
    // <section className="w-full bg-white pb-12 pt-2">
    // <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop">
    // <div className="flex flex-col w-full items-start">
    // <TopBarFilter allProducts={initialProducts} onFilterChange={setFilteredProducts} />

    // We want to pull TopBarFilter OUT of the max-w container so it can be 100% wide.
    // Let's just find `<TopBarFilter ... />` and move it just BEFORE the `<section>` that contains it.
    // Since we know the exact string, let's do a regex replacement.

    // Let's find the exact section opening
    const regex = /<section className="w-full[^>]*>\s*<div className="max-w-\[1360px\][^>]*>\s*<div className="flex flex-col w-full items-start">\s*(<TopBarFilter[^>]*\/>)/g;
    
    // Wait, Men.jsx currently has:
    // <section className="w-full max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop pb-12 pt-2">
    // <div className="flex flex-col w-full items-start">
    // <TopBarFilter ... />
    
    // Let's do a simpler replacement: find the TopBarFilter tag, remove it, and insert it before the section.
    let filterMatch = content.match(/<TopBarFilter[^>]*\/>/);
    if (filterMatch) {
        let filterStr = filterMatch[0];
        // Remove it from its current location
        content = content.replace(/\s*<TopBarFilter[^>]*\/>\s*/, '\n\n');
        
        // Find where the main content section starts (the one after the header)
        // Header ends with </section> then comes the main section
        // We can just insert TopBarFilter right before `<main className="w-full space-y-space-2xl">` ? No, that is still inside the max-w container.
        
        // Let's look for `<section className="w-full max-w-[1360px]` or `<section className="w-full bg-white pb-12 pt-2">`
        // Actually, we can just insert it after the first `</section>` (the header section).
        let parts = content.split('</section>');
        if (parts.length >= 2) {
            // parts[0] is the header section
            // parts[1] is the main section
            content = parts[0] + '</section>\n\n' + filterStr + '\n\n' + parts.slice(1).join('</section>');
        }
    }
    
    fs.writeFileSync(pagePath, content, 'utf8');
});

console.log('Fixed TopBarFilter width and alignment');
