import type { Metadata } from 'next';
import SideBar from '../_components/admin/SideBar';
import Footer from '../_components/footer/Footer';
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
        <div className='min-h-screen bg-gray-100 flex'>
          <SideBar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
