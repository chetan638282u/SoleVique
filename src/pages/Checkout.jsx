import React from 'react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white px-4 text-center">
      <div className="max-w-xl flex flex-col items-center">
        <span className="material-symbols-outlined text-[64px] text-brand-black mb-6">info</span>
        <h1 className="font-architectural text-3xl sm:text-4xl text-brand-black tracking-tight mb-4">
          Portfolio Demonstration
        </h1>
        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-8">
          Thank you for exploring this e-commerce demonstration. This project is a portfolio showcase designed to highlight front-end architecture, UI/UX design, and React development skills. Complete payment processing, backend checkout procedures, and authentication integrations would be fully implemented in a live, commercial version of this website.
        </p>
        <Link to="/" className="inline-flex h-12 items-center justify-center px-8 bg-brand-black text-white font-bold uppercase tracking-wider text-xs hover:bg-neutral-800 transition-colors">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
