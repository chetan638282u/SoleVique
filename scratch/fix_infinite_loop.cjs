const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'pages');

['Men.jsx', 'Women.jsx'].forEach(page => {
    let content = fs.readFileSync(path.join(srcDir, page), 'utf8');

    // Add useMemo to import if not there
    if (!content.includes('useMemo')) {
        content = content.replace("import React, { useState } from 'react';", "import React, { useState, useMemo } from 'react';");
    }

    // Replace the unstable initialProducts
    if (page === 'Men.jsx') {
        content = content.replace(
            'const initialProducts = globalProducts.filter(p => p.categories?.includes("Men"));',
            'const initialProducts = useMemo(() => globalProducts.filter(p => p.categories?.includes("Men")), []);'
        );
    } else if (page === 'Women.jsx') {
        content = content.replace(
            'const initialProducts = globalProducts.filter(p => p.categories?.includes("Women"));',
            'const initialProducts = useMemo(() => globalProducts.filter(p => p.categories?.includes("Women")), []);'
        );
    }

    fs.writeFileSync(path.join(srcDir, page), content, 'utf8');
});

console.log('Fixed infinite loop in Men.jsx and Women.jsx');
