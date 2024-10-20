import type { Metadata } from 'next';
import SideBar from '../_components/admin/SideBar';
import Footer from '../_components/footer/Footer';
import '../globals.css';
import Client from '../_components/client/Client';

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
        <div className='min-h-screen bg-gray-100 flex'>
          <Client />
          <SideBar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
