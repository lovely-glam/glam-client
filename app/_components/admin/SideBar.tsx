'use client';
import { getCurrentRole } from '@/app/_services/localService';
import { getCurrentUser } from '@/app/_services/userService';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaHome, FaUser } from 'react-icons/fa'; // You can use react-icons for icons

const customerLinks = [
  { title: 'Thông tin', path: '/profile' },
  { title: 'Bảo mật', path: '/securiy' },
];

const businessLinks = [
  { title: 'Trang chủ', path: '/business/' },
  { title: 'Thống kê', path: '/business/dashboard' },
  { title: 'Khách hàng', path: '/business/customers' },
];

const adminLinks = [
  { title: 'Thống kê', path: '/admin/dashboard' },
  { title: 'Doanh nghiệp', path: '/admin/business' },
  { title: 'Khách hàng', path: '/admin/customers' },
];

const SideBar = () => {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const token = localStorage.getItem('accessToken');

    if (token !== null && token !== undefined) {
      // setAuthenticated(true);
      // TODO: get profile
      const res = await getCurrentUser();

      if (res.status === 200) {
        setUser(res.data.content);
        setRole(getCurrentRole());
      }
    }
  };

  return (
    <div className='bg-primary text-white h-screen w-2 md:w-32 flex flex-col items-center md:items-start p-4 py-12 rounded-tr-[90px]'>
      <div className='flex flex-col space-y-6'>
        {(role === 'ROLE_USER' &&
          customerLinks.map((link) => (
            <Link
              key={link.title}
              href={link.path}
              className='flex items-center space-x-3 hover:bg-red-700 p-2 rounded-lg w-full'
            >
              <FaUser size={20} />
              <span className='hidden md:inline'>{link.title}</span>
            </Link>
          ))) ||
          (role === 'ROLE_BUSINESS' &&
            businessLinks.map((link) => (
              <Link
                key={link.title}
                href={link.path}
                className='flex items-center space-x-3 hover:bg-red-700 p-2 rounded-lg w-full'
              >
                <FaUser size={20} />
                <span className='hidden md:inline'>{link.title}</span>
              </Link>
            ))) ||
          (role === 'ROLE_ADMIN' &&
            adminLinks.map((link) => (
              <Link
                key={link.title}
                href={link.path}
                className='flex items-center space-x-3 hover:bg-red-700 p-2 rounded-lg w-full'
              >
                <FaUser size={20} />
                <span className='hidden md:inline'>{link.title}</span>
              </Link>
            )))}
      </div>
    </div>
  );
};

export default SideBar;
