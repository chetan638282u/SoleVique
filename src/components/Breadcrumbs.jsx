import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { products } from '../data/products';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // If on home page, don't show breadcrumbs
  if (pathnames.length === 0) return null;

  const routeNameMap = {
    'men': "Men",
    'women': "Women",
    'bestsellers': "All Products",
    'new-arrivals': "New Arrivals",
    'sale': "Sale",
    'cart': "Cart"
  };

  let trails = [{ name: 'Home', path: '/' }];

  if (pathnames[0] === 'product') {
    const productName = location.state?.name;
    const product = products.find(p => p.name === productName);
    if (location.state?.from === '/bestsellers') {
      trails.push({ name: 'All Products', path: '/bestsellers' });
    } else if (product?.categories) {
      if (product.categories.includes("Men")) {
        trails.push({ name: 'Men', path: '/men' });
      } else if (product.categories.includes("Women")) {
        trails.push({ name: 'Women', path: '/women' });
      }
    }
    trails.push({ name: productName || "Product", path: location.pathname });
  } else {
    let currentPath = '';
    pathnames.forEach(name => {
      currentPath += `/${name}`;
      trails.push({
        name: routeNameMap[name] || name,
        path: currentPath
      });
    });
  }

  return (
    <div className="w-full bg-white pt-4 pb-0">
      <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop">
        <nav className="flex flex-wrap text-[11px] sm:text-xs tracking-widest uppercase text-neutral-400 font-semibold space-x-2">
          {trails.map((trail, index) => {
            const isLast = index === trails.length - 1;
            return (
              <span key={trail.path} className="flex items-center">
                {isLast ? (
                  <span className="text-brand-black">{trail.name}</span>
                ) : (
                  <>
                    <Link to={trail.path} className="hover:text-primary transition-colors">
                      {trail.name}
                    </Link>
                    <span className="mx-2 text-neutral-300">/</span>
                  </>
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
