const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

const homePath = path.join(srcDir, 'pages', 'Home.jsx');
const homeContent = fs.readFileSync(homePath, 'utf8');

// Extract the newsletter section from Home.jsx
// It starts with <section className="bg-brand-ember text-white px-4 relative overflow-hidden py-16" data-purpose="newsletter-strip">
// and ends with </section> just before the footer
const startStr = '<section className="bg-brand-ember text-white px-4 relative overflow-hidden py-16" data-purpose="newsletter-strip">';
const homeStartIndex = homeContent.indexOf(startStr);
const homeEndIndex = homeContent.indexOf('</section>', homeStartIndex) + '</section>'.length;
const newsletterSection = homeContent.substring(homeStartIndex, homeEndIndex);

const pages = ['Men.jsx', 'Women.jsx', 'Sale.jsx', 'NewArrivals.jsx', 'Bestsellers.jsx'];

pages.forEach(page => {
    let pagePath = path.join(srcDir, 'pages', page);
    if (!fs.existsSync(pagePath)) return;
    
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // In Men.jsx, the section starts with <section className="w-full bg-secondary text-on-secondary py-space-3xl">
    // In NewArrivals, it's also <section className="w-full bg-secondary text-on-secondary py-space-3xl">
    // In Bestsellers, it might be <section className="w-full bg-primary py-16 text-white overflow-hidden">
    
    // We can find the section that contains "Get 10% Off" or "GET 10% OFF"
    // Regex to match a section that contains the text
    const regex = /<section[^>]*>(?:(?!<\/section>).)*?10%\s*OFF(?:(?!<\/section>).)*?<\/section>/gis;
    
    let newContent = content.replace(regex, newsletterSection);
    
    if (newContent !== content) {
        fs.writeFileSync(pagePath, newContent, 'utf8');
        console.log(`Updated ${page}`);
    } else {
        console.log(`No change in ${page}`);
    }
});
