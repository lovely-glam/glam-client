import type { Metadata } from 'next';
import '../globals.css';
import NavBar from '../_components/header/NavBar';
import Footer from '../_components/footer/Footer';
import SideBar from '../_components/admin/SideBar';

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
        <NavBar />
        <div className='min-h-screen bg-gray-100'>
          <SideBar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
