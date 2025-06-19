'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../lib/firebase'; // adjust this path if needed

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // ❌ Hide navbar on landing page
  if (pathname === '/') {
    return null;
  }

  const handleTitleClick = () => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Logged in – do nothing or go to dashboard
        console.log('User is logged in');
      } else {
        // Not logged in – redirect to landing
        router.push('/');
      }
    });
  };

  return (
    <nav className="w-full bg-green-600 text-white shadow-md fixed top-0 left-0 z-50 h-16 flex items-center justify-center cursor-pointer">
      <h1
        onClick={handleTitleClick}
        className="text-xl font-bold tracking-wide hover:text-gray-200 transition"
      >
        Loan Management System
      </h1>
    </nav>
  );
};

export default Navbar;
