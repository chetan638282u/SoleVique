import React from 'react';
import { Outlet } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Breadcrumbs from './Breadcrumbs';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-black font-sans">
      <AnnouncementBar />
      <Navbar />
      <Breadcrumbs />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
