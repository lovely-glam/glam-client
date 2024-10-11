'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import NavLinks from './NavLinks';
import Link from 'next/link';
import { RiCalendar2Fill } from 'react-icons/ri';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { getCurrentUsername } from '@/app/_services/localService';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();
  const [username, setUsername] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, [pathname]);

  const checkUser = () => {
    console.log(getCurrentUsername());
    if (getCurrentUsername() !== null) {
      setUsername(getCurrentUsername());
      // TODO: get profile
    }
  };

  return (
    <nav className='p-4 px-8'>
      <div className='flex justify-between items-center w-full'>
        <Link href='/'>
          <Image
            className='w-[10rem] h-28'
            src='/icon.ico'
            width={80}
            height={80}
            alt='Logo'
          />
        </Link>
        <NavLinks />
        <div className='flex space-x-10 items-center'>
          <RiCalendar2Fill size={25} />
          <MdOutlineShoppingCart size={25} />
          {username !== null ? (
            <div></div>
          ) : (
            <Link
              href='/login'
              className='btn btn-neutral text-white rounded-full py-0'
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
