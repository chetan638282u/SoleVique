const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix the syntax errors from previous Link wrapping

// 1. Fix Women section closing tag
content = content.replace(
    /<\/div><\/div><\/div><\/Link>/g,
    '</div></div></Link>'
);

// 2. Fix the others if they have an extra </div>
// Actually, let's just make the whole Anthology section correct.
// We know the exact structure we want. Let's replace the whole data-purpose="editorial-anthology" section.

const correctSection = `<section className="bg-[#F9F8F6] border-b border-black/10 py-16 lg:py-20 relative overflow-hidden" data-purpose="editorial-anthology">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center max-w-3xl mx-auto mb-12">
<h2 className="font-architectural text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight mb-3">THE SOLEVIQUE ANTHOLOGY</h2>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
<Link to="/women" className="lg:col-span-7 group relative rounded-2xl overflow-hidden border border-black/10 bg-white min-h-[500px] lg:min-h-[580px] flex flex-col justify-between block">
<div className="absolute inset-0 z-0 overflow-hidden">
<img alt="Women's Footwear Campaign" className="w-full h-full object-cover" src="/images/women_campaign.png" />
<div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent"></div>
</div>
<div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full">
<div></div>
<div className="pt-24">
<h3 className="font-architectural text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2">WOMEN</h3>
</div>
</div>
</Link>
<div className="lg:col-span-5 flex flex-col gap-6">
<Link to="/bestsellers" className="group relative rounded-2xl overflow-hidden border border-black/10 bg-brand-charcoal min-h-[270px] lg:min-h-[280px] flex-1 flex flex-col justify-between block">
<div className="absolute inset-0 z-0 overflow-hidden">
<img alt="Bestsellers Footwear Campaign" className="w-full h-full object-cover" src="/images/bestsellers_campaign.png" />
<div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent"></div>
</div>
<div className="relative z-10 p-6 flex flex-col justify-between h-full">
<div></div>
<div className="pt-12">
<h3 className="font-architectural text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">BESTSELLERS</h3>
<p className="text-xs text-neutral-300 font-medium">Timeless forms refined season after season.</p>
</div>
</div>
</Link>
<Link to="/men" className="group relative rounded-2xl overflow-hidden border border-black/10 bg-brand-charcoal min-h-[270px] lg:min-h-[280px] flex-1 flex flex-col justify-between block">
<div className="absolute inset-0 z-0 overflow-hidden">
<img alt="Men's Footwear Campaign" className="w-full h-full object-cover" src="/images/men_campaign.png" />
<div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent"></div>
</div>
<div className="relative z-10 p-6 flex flex-col justify-between h-full">
<div></div>
<div className="pt-12">
<h3 className="font-architectural text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">MEN</h3>
<p className="text-xs text-neutral-300 font-medium">Architectural tailoring crafted in Marche.</p>
</div>
</div>
</Link>
</div>
</div>
</div>
</section>`;

// Replace the entire section to avoid mismatching tags
const startIndex = content.indexOf('<section className="bg-[#F9F8F6] border-b border-black/10 py-16 lg:py-20 relative overflow-hidden" data-purpose="editorial-anthology">');
const endIndex = content.indexOf('<section className="bg-[#F9F8F6] border-b border-black/10 py-16 lg:py-20" data-purpose="shop-by-category">');

if (startIndex !== -1 && endIndex !== -1) {
    content = content.slice(0, startIndex) + correctSection + content.slice(endIndex);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed syntax in Home.jsx');
