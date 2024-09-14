import Image from 'next/image';
import React from 'react';
import NavLinks from './NavLinks';
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav>
      <div className='flex'>
        <Link href='/'>
          <Image
            className='w-8 h-8'
            src='/icon.ico'
            width={100}
            height={100}
            alt='Logo'
          />
        </Link>
        <NavLinks />
      </div>
    </nav>
  );
};

export default NavBar;
