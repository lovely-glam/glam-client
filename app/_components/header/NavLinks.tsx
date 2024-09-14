'use client';
import Link from 'next/link';
import React from 'react';

const links = [
  { path: '/', title: 'Trang chủ' },
  { path: '/about', title: 'Về chúng tôi' },
  { path: '/shops', title: 'Cửa hàng' },
  { path: '/business', title: 'Cho doanh nghiệp' },
  { path: '/contact', title: 'Liên hệ' },
];

const NavLinks = () => {
  return (
    <div>
      <ul className='flex space-x-10'>
        {links.map((link, index) => (
          <li key={index}>
            <Link href={`${link.path}`}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavLinks;
