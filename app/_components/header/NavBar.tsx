import Image from 'next/image';
import React from 'react';
import NavLinks from './NavLinks';
import Link from 'next/link';
import { RiCalendar2Fill } from 'react-icons/ri';
import { MdOutlineShoppingCart } from 'react-icons/md';

const NavBar = () => {
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
          <Link
            href='/login'
            className='btn btn-neutral text-white rounded-full py-0'
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
