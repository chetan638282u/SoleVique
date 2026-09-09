import React from 'react';

export default function PriceDisplay({ amount }) {
  // Always display in INR (₹)
  return <span className="font-semibold text-brand-ember">₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>;
}
