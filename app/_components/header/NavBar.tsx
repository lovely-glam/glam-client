'use client';
import { getCurrentUser } from '@/app/_services/userService';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { RiCalendar2Fill } from 'react-icons/ri';
import NavLinks from './NavLinks';

const NavBar = () => {
  const [username, setUsername] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState<any>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const token = localStorage.getItem('accessToken');

    if (token !== null && token !== undefined) {
      setAuthenticated(true);
      // TODO: get profile
      const res = await getCurrentUser();

      if (res.status === 200) {
        console.log(res.data);
        setUser(res.data.content);
      }
    }
  };

  const isAuthenticated = () => {};

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
          <Link href={'/payment'}>
            <MdOutlineShoppingCart size={25} />
          </Link>
          {authenticated ? (
            <div>
              <Image
                src={user?.avatarUrl ?? ''}
                alt=''
                width={60}
                height={60}
                className='rounded-full'
              />
            </div>
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
