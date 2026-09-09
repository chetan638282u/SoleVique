document.addEventListener('DOMContentLoaded', () => {

  // 1. Wishlist Buttons Toggle
  const wishlistButtons = document.querySelectorAll('button[aria-label="Add to Wishlist"], button[aria-label="Wishlist"]');
  wishlistButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const svg = btn.querySelector('svg');
      if (svg) {
        if (svg.getAttribute('fill') === 'none') {
          svg.setAttribute('fill', 'currentColor');
          svg.classList.add('text-brand-ember');
          showToast('Added to Wishlist');
        } else {
          svg.setAttribute('fill', 'none');
          svg.classList.remove('text-brand-ember');
          showToast('Removed from Wishlist');
        }
      }
    });
  });

  // 2. Add to Cart Buttons
  // Look for buttons that say "Add to Cart" or "Add to Bag"
  const addCartButtons = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.toLowerCase().includes('add to cart') || b.textContent.toLowerCase().includes('add to bag'));
  addCartButtons.forEach(btn => {
    // Only bind if it's not a generic button or the actual cart button
    if (!btn.getAttribute('aria-label')?.includes('Cart')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Update cart badge if it exists
        const cartBadge = document.querySelector('header button[aria-label*="Cart"] span.absolute');
        if (cartBadge) {
          let count = parseInt(cartBadge.textContent || '0');
          cartBadge.textContent = count + 1;
        }

        showToast('Item added to cart successfully!');
      });
    }
  });

  // 3. Toast Notification System
  function showToast(message) {
    let toast = document.getElementById('solevique-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'solevique-toast';
      toast.className = 'fixed bottom-5 right-5 bg-brand-charcoal text-white px-6 py-3 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-20 opacity-0 z-50 flex items-center gap-3';
      toast.innerHTML = `
        <svg class="w-5 h-5 text-brand-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        <span class="font-medium text-sm"></span>
      `;
      document.body.appendChild(toast);
    }
    
    toast.querySelector('span').textContent = message;
    
    // Animate in
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    
    // Animate out after 3s
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
  }

  // 4. Cart Page specific logic
  if (window.location.pathname.includes('/cart')) {
    // We look for minus and plus SVG buttons
    const itemRows = document.querySelectorAll('.flex.items-center.gap-4.p-4, .flex.flex-col.sm\\:flex-row.gap-6.py-6'); 
    
    itemRows.forEach(row => {
      const quantityText = row.querySelector('.text-sm.font-semibold.w-6.text-center, .w-8.text-center');
      if (quantityText) {
        // Find the adjacent buttons
        const controls = quantityText.parentElement.querySelectorAll('button');
        if (controls.length >= 2) {
          const minusBtn = controls[0];
          const plusBtn = controls[1];
          const priceElement = row.querySelector('.text-base.font-bold, .text-lg.font-bold');
          let basePrice = 0;
          if (priceElement) {
             basePrice = parseFloat(priceElement.textContent.replace(/[^0-9.]/g, ''));
          }

          plusBtn.addEventListener('click', () => {
            let qty = parseInt(quantityText.textContent);
            qty++;
            quantityText.textContent = qty;
            updateCartTotals();
          });

          minusBtn.addEventListener('click', () => {
            let qty = parseInt(quantityText.textContent);
            if (qty > 1) {
              qty--;
              quantityText.textContent = qty;
              updateCartTotals();
            }
          });
        }
      }
      
      // Remove button logic
      const removeBtn = Array.from(row.querySelectorAll('button')).find(b => b.textContent.toLowerCase().includes('remove') || (b.getAttribute('aria-label') && b.getAttribute('aria-label').toLowerCase().includes('remove')));
      if (removeBtn) {
        removeBtn.addEventListener('click', () => {
          row.style.display = 'none';
          showToast('Item removed from cart');
          updateCartTotals();
        });
      }
    });

    function updateCartTotals() {
      // Basic recalculation simulation
      let total = 0;
      let count = 0;
      itemRows.forEach(row => {
        if (row.style.display !== 'none') {
           const quantityText = row.querySelector('.text-sm.font-semibold.w-6.text-center, .w-8.text-center');
           const priceEl = row.querySelector('.text-base.font-bold, .text-lg.font-bold, .text-right .font-bold');
           if (quantityText && priceEl) {
             const qty = parseInt(quantityText.textContent);
             const text = row.textContent;
             const matches = text.match(/\$[0-9,.]+/g);
             let price = 0;
             if (matches && matches.length > 0) {
               // Take the first price as base price, assuming it's listed
               price = parseFloat(matches[0].replace(/[^0-9.]/g, ''));
             }
             if (price) {
               total += (price * qty);
               count += qty;
             }
           }
        }
      });
      
      // Update subtotal fields
      const summaryValues = document.querySelectorAll('.text-brand-black.font-bold');
      summaryValues.forEach(val => {
        if (val.textContent.includes('$')) {
          if (val.parentElement.textContent.toLowerCase().includes('subtotal') || val.parentElement.textContent.toLowerCase().includes('total')) {
            val.textContent = '$' + total.toFixed(2);
          }
        }
      });
      
      const cartBadge = document.querySelector('header button[aria-label*="Cart"] span.absolute');
      if (cartBadge) cartBadge.textContent = count;
    }
  }

  // 5. Product Page specific logic
  if (window.location.pathname.includes('/product')) {
    // Size selectors (buttons with numbers like 7, 7.5, 8 etc.)
    const sizeSection = Array.from(document.querySelectorAll('div')).find(div => div.textContent.includes('Select Size'));
    if (sizeSection) {
      const sizeButtons = sizeSection.querySelectorAll('button:not(.line-through)'); // Exclude disabled ones
      sizeButtons.forEach(btn => {
        // If it looks like a size button (short text)
        if (btn.textContent.trim().length <= 5 && !btn.textContent.includes('Size')) {
          btn.addEventListener('click', () => {
            // Remove active classes from all
            sizeButtons.forEach(b => {
              b.classList.remove('bg-brand-black', 'text-white', 'border-brand-black');
              b.classList.add('bg-white', 'text-brand-charcoal', 'border-brand-border');
            });
            // Add active class to clicked
            btn.classList.remove('bg-white', 'text-brand-charcoal', 'border-brand-border');
            btn.classList.add('bg-brand-black', 'text-white', 'border-brand-black');
          });
        }
      });
    }

    // Color selectors (round buttons)
    // Find div containing 'Color:' or 'Select Color'
    const colorButtons = document.querySelectorAll('button.rounded-full');
    colorButtons.forEach(btn => {
      // If it's used as a color swatch (usually has a bg color style or ring)
      if (btn.classList.contains('w-8') || btn.classList.contains('w-10')) {
        btn.addEventListener('click', () => {
          // Remove ring from all
          colorButtons.forEach(b => {
            b.classList.remove('ring-2', 'ring-brand-black', 'ring-offset-2');
            b.classList.add('ring-1', 'ring-transparent'); // reset
          });
          // Add ring to clicked
          btn.classList.add('ring-2', 'ring-brand-black', 'ring-offset-2');
        });
      }
    });
  }

});
