import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Navbar } from '@/components/navigation';
import { Toaster } from '@/components/ui/sonner';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { SidebarProvider } from '@/components/ui/sidebar';
import './globals.css';
import { Link } from 'lucide-react';

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

          {/* vercel analytics */}
          <Analytics />
          <SpeedInsights />
          <footer>
            <p className='text-center text-xs text-slate-500 dark:text-slate-400'>
              © {new Date().getFullYear()} Scouts Ter Alwina. All rights
              reserved - Made by SVN Consulting.
            </p>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
