import React, { useState, useEffect } from 'react';

export default function AnnouncementBar() {
  const announcements = [
    "5% Off on every online payment",
    "Easy Returns and Exchanges",
    "Complimentary Express Shipping on all orders"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full bg-brand-charcoal text-[#F9F8F6] py-2.5 px-4 border-b border-neutral-800" data-purpose="top-ticker">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <p className="tracking-widest uppercase text-[11px] sm:text-xs font-medium text-center" key={currentIndex}>
          {announcements[currentIndex]}
        </p>
      </div>
    </div>
  );
}
