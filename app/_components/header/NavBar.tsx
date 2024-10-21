'use client';
import { getCurrentUser } from '@/app/_services/userService';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { RiCalendar2Fill } from 'react-icons/ri';
import NavLinks from './NavLinks';
import { FiChevronDown } from 'react-icons/fi';

const NavBar = () => {
  const [username, setUsername] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState<any>(false);
  const [showDropdown, setShowDropdown] = useState(false);
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
        setUser(res.data.content);
      }
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const isAuthenticated = () => {};

  const handleLogout = () => {
    // logout();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuthenticated(false); // Update state to rerender
    window.location.href = '/';
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
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
          <Link href={'/payment'}>
            <MdOutlineShoppingCart size={25} />
          </Link>
          {authenticated ? (
            <div>
              <div className='relative'>
                <button
                  onClick={toggleDropdown}
                  className='flex items-center text-secondary hover:text-primary transition-colors cursor-pointer'
                >
                  <div className='w-16 h-16 rounded-full overflow-hidden'>
                    <Image
                      src={
                        isValidUrl(user?.avatarUrl ?? '')
                          ? user?.avatarUrl
                          : '/icon.ico'
                      }
                      alt=''
                      width={1024}
                      height={1024}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <FiChevronDown />
                </button>
                {showDropdown && (
                  <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 border-2 z-10'>
                    <Link
                      href='/profile'
                      className='text-sm block px-4 py-2 text-black hover:bg-gray-300'
                    >
                      Hồ sơ
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='text-sm block w-full text-left px-4 py-2 text-black hover:bg-gray-300'
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
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
