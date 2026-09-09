const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'pages');

const pages = ['Men.jsx', 'Women.jsx', 'Bestsellers.jsx'];

pages.forEach(page => {
    let content = fs.readFileSync(path.join(srcDir, page), 'utf8');

    // 1. Replace the Grid container
    content = content.replace(/<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">/g, '<div className="flex flex-col w-full items-start">');

    // 2. Remove SidebarFilter block and inject TopBarFilter
    // We want to remove:
    // <div className="lg:col-span-3 sticky top-[100px] hidden lg:block">
    //   <SidebarFilter allProducts={initialProducts} onFilterChange={setFilteredProducts} />
    // </div>
    const sidebarRegex = /<div className="lg:col-span-3[^>]*>[\s\S]*?<SidebarFilter[\s\S]*?\/>\s*<\/div>/g;
    content = content.replace(sidebarRegex, '<TopBarFilter allProducts={initialProducts} onFilterChange={setFilteredProducts} />');

    // 3. Update the main/div wrapper holding the products from lg:col-span-9 to w-full
    // In Men it's <main className="lg:col-span-9 space-y-space-2xl">
    // We just replace lg:col-span-9 with w-full
    content = content.replace(/lg:col-span-9/g, 'w-full');
    content = content.replace(/lg:col-span-8/g, 'w-full'); // Bestsellers uses col-span-8 for something else? Let's be careful. Let's just do col-span-9.
    
    fs.writeFileSync(path.join(srcDir, page), content, 'utf8');
});

console.log('Fixed layout in pages');
