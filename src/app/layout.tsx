import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Navbar } from '@/components/navigation';
import { Toaster } from '@/components/ui/sonner';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Scouts Ter Alwina - Aanwezigheden',
  description:
    'Web App voor het beheer van aanwezigheden voor Scouts Ter Alwina',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='nl'>
        <body
          className={`${inter.className} antialiased max-w-full min-h-screen flex flex-col`}>
          <SidebarProvider>
            <main className='w-full flex-grow'>
              <Navbar />
              {children}
            </main>
            <Toaster />
          </SidebarProvider>

          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
