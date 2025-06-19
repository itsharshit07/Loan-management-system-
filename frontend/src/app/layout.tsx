// src/app/layout.tsx
'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';
import './globals.css';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  return (
    <html lang="en">
      <body className={`${isLandingPage ? '' : 'pt-16'} bg-gray-100 min-h-screen`}>
        {!isLandingPage && <Navbar />}
        {children}
      </body>
    </html>
  );
}
