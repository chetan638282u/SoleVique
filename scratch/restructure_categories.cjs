const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const categories = [
  { name: 'Running', src: '/images/men/Aeroknit Minimal Runner.png', link: '/men' },
  { name: 'Casual', src: '/images/men/Slate Minimal Court Sneaker.png', link: '/men' },
  { name: 'Formal', src: '/images/men/Oxblood Double Monk Strap.png', link: '/men' },
  { name: 'Sandals', src: '/images/women/Architectural Cross Slide.png', link: '/men' }, // maybe link to women later, but keeping as is
  { name: 'Sports', src: '/images/men/Technical Trail Runner 02.png', link: '/men' }
];

const newSectionHtml = `<section className="bg-[#F9F8F6] border-b border-black/10 py-16 lg:py-20" data-purpose="shop-by-category">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
    <div>
      <h2 className="font-architectural text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight">Shop by Category</h2>
    </div>
  </div>
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
    ${categories.map((cat, index) => {
      // The last item has col-span-2 sm:col-span-1 in the original
      const extraClass = index === 4 ? " col-span-2 sm:col-span-1 lg:col-span-1" : "";
      return `<Link className="flex flex-col cursor-pointer group${extraClass}" to="${cat.link}">
      <div className="w-full aspect-square rounded-xl bg-white border border-black/10 overflow-hidden flex items-center justify-center p-6 relative transition-colors group-hover:border-brand-ember/50">
        <img alt="${cat.name} Category" className="w-full h-full object-contain transition-transform group-hover:scale-105 duration-500" src="${cat.src}" />
      </div>
      <p className="text-sm text-brand-charcoal font-normal leading-snug mt-3 lowercase">${cat.name}</p>
    </Link>`;
    }).join('\n    ')}
  </div>
</div>
</section>`;

// Now find the start and end of the shop-by-category section
const startMarker = '<section className="bg-[#F9F8F6] border-b border-black/10 py-16 lg:py-20" data-purpose="shop-by-category">';
const endMarker = '</section>';

const startIndex = content.indexOf(startMarker);
if (startIndex !== -1) {
    const nextSectionIndex = content.indexOf('<section', startIndex + 10);
    const endIndex = nextSectionIndex !== -1 ? nextSectionIndex : content.lastIndexOf('</section>') + 10;
    
    // Actually, it's safer to find the closing </section> tag properly
    // It is the immediate child of the main layout if we don't have nested sections, which we don't.
    // So finding the NEXT '<section' and then going backwards to the previous '</section>' works.
    
    let actualEndIndex = -1;
    if (nextSectionIndex !== -1) {
        actualEndIndex = content.lastIndexOf('</section>', nextSectionIndex) + 10;
    } else {
        // It's the last section
        actualEndIndex = content.indexOf('</section>', startIndex) + 10;
        // if there's more, maybe we need to be careful, but we just want to replace up to </section>
        let tempIndex = startIndex;
        let depth = 0;
        for (let i = startIndex; i < content.length; i++) {
            if (content.substr(i, 8) === '<section') depth++;
            if (content.substr(i, 9) === '</section>') {
                depth--;
                if (depth === 0) {
                    actualEndIndex = i + 10;
                    break;
                }
            }
        }
    }
    
    if (actualEndIndex !== -1) {
        content = content.slice(0, startIndex) + newSectionHtml + content.slice(actualEndIndex);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Successfully updated Shop by Category section.');
    } else {
        console.log('Could not find the end of the section.');
    }
} else {
    console.log('Could not find the start of the section.');
}
