import type { Metadata } from 'next';
import { Suspense } from 'react';
import Footer from '../_components/footer/Footer';
import NavBar from '../_components/header/NavBar';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Lovely Glam',
  description: 'We are Lovely Glam',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Suspense>
          <NavBar />
        </Suspense>
        <div className='min-h-screen bg-gray-100'>
          <Suspense>{children}</Suspense>
        </div>
        <Footer />
      </body>
    </html>
  );
}
