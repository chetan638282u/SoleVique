const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'pages');

const pages = ['Men.jsx', 'Women.jsx', 'Bestsellers.jsx'];

pages.forEach(page => {
    let content = fs.readFileSync(path.join(srcDir, page), 'utf8');

    // Update Import
    content = content.replace("import SidebarFilter from '../components/SidebarFilter';", "import TopBarFilter from '../components/TopBarFilter';");

    // Replace layout structure
    // We want to replace:
    // <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
    //   <div className="lg:col-span-3 sticky top-[100px] hidden lg:block">
    //     <SidebarFilter allProducts={initialProducts} onFilterChange={setFilteredProducts} />
    //   </div>
    //   <div className="lg:col-span-9">
    //
    // WITH:
    //
    // <div className="flex flex-col w-full gap-4">
    //   <TopBarFilter allProducts={initialProducts} onFilterChange={setFilteredProducts} />
    //   <div className="w-full">

    const sidebarStart = content.indexOf('<div className="lg:col-span-3');
    if (sidebarStart !== -1) {
        // Find where the col-span-9 starts
        const colSpan9Start = content.indexOf('<div className="lg:col-span-9">', sidebarStart);
        if (colSpan9Start !== -1) {
            // Find the grid container that wraps them both
            // It should be `<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">`
            // Let's do a more robust regex replacement instead.
            
            // Just replace the grid wrapper with flex-col
            content = content.replace(/<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">/, '<div className="flex flex-col w-full items-start">');
            
            // Replace the sidebar with TopBarFilter
            const sidebarHtmlRegex = /<div className="lg:col-span-3 sticky top-\[100px\] hidden lg:block">\s*<SidebarFilter allProducts=\{initialProducts\} onFilterChange=\{setFilteredProducts\} \/>\s*<\/div>/;
            content = content.replace(sidebarHtmlRegex, '<TopBarFilter allProducts={initialProducts} onFilterChange={setFilteredProducts} />');
            
            // Replace col-span-9 with w-full
            content = content.replace(/<div className="lg:col-span-9">/g, '<div className="w-full">');
        }
    }

    fs.writeFileSync(path.join(srcDir, page), content, 'utf8');
});

// Delete SidebarFilter.jsx
const sidebarPath = path.join(__dirname, '..', 'src', 'components', 'SidebarFilter.jsx');
if (fs.existsSync(sidebarPath)) {
    fs.unlinkSync(sidebarPath);
}

console.log('Refactored pages and deleted SidebarFilter.jsx');
