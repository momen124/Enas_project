'use client';

import React, { ReactNode } from 'react';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 text-[var(--text-color)]">
        {children}
      </main>
      <Footer />
    </>
  );
}