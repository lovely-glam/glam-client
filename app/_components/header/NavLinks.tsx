'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const links = [
  { path: '/', title: 'Trang chủ' },
  { path: '/about', title: 'Về chúng tôi' },
  { path: '/shops', title: 'Cửa hàng' },
  { path: '/business', title: 'Cho doanh nghiệp' },
  { path: '/contact', title: 'Liên hệ' },
];

const NavLinks = () => {
  const currentPath = usePathname();

  return (
    <div>
      <ul className='flex space-x-20'>
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={`${link.path}`}
              className={classNames({
                'text-black font-semibold': link.path === currentPath,
                'text-black': link.path !== currentPath,
                'hover:font-semibold transition-colors': true,
              })}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavLinks;
