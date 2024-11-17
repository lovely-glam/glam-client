'use client';
import { checkUserRole } from '@/app/_services/tokenService';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { FaBars, FaBuilding, FaCalendarAlt, FaChartBar, FaChartLine, FaComment, FaConnectdevelop, FaHome, FaLock, FaRocket, FaSignOutAlt, FaUser, FaUserAlt, FaUserCircle, FaUsers } from 'react-icons/fa';
const customerLinks: SideBarLink[] = [
  { title: 'Thông tin', path: '/profile', icon: FaUserAlt },
  { title: 'Bảo mật', path: '/security', icon: FaLock },
];

type SideBarLink = {
  title: string;
  path: string;
  icon: IconType;
}

const businessLinks: SideBarLink[] = [
  { title: 'Trang chủ', path: '/business/profile', icon: FaHome },
  { title: 'Thống kê', path: '/business/dashboard', icon: FaChartBar },
  { title: 'Khách hàng', path: '/business/customers', icon: FaUsers },
  { title: 'Chat', path: '/business/chat', icon: FaComment },
  { title: 'Subscription Plans', path: '/business/subscription', icon: FaRocket },
  { title: 'Booking', path: '/business/booking', icon: FaCalendarAlt },
]

const adminLinks: SideBarLink[] = [
  { title: 'Thống kê', path: '/admin/dashboard', icon: FaChartLine },
  // { title: 'Doanh nghiệp', path: '/admin/business', icon: FaBuilding },
  // { title: 'Khách hàng', path: '/admin/customers', icon: FaUser },
  { title: 'Account', path: '/admin/account', icon: FaUserCircle },
  { title: 'Contact', path: '/admin/contact', icon: FaConnectdevelop }
];

const SideBar = () => {
  const [role, setRole] = useState<any>(null);

  useEffect(() => {
    const getUserRole = async () => {
      var role = await checkUser();
      setRole(role);
    };
    getUserRole();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/"
  }

  const checkUser = async (): Promise<string> => {
    const token = localStorage.getItem('accessToken');
    const role = await checkUserRole(token);
    return role.role;
  };
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div
      className={`bg-gradient-to-b from-[#d46a6a] via-[#a23d3d] to-[#7e2f2f] text-white ${isExpanded ? 'w-64' : 'w-20'
        } flex flex-col items-center md:items-start p-4 py-12 rounded-tr-3xl shadow-lg transition-all duration-300`}
    >
      <button
        className='text-white flex items-center justify-center space-x-2 mb-8 w-full'
        onClick={toggleSidebar}
      >
        {isExpanded ? (
          <img src='/icon.ico' alt='Icon' className='w-10 h-10' />
        ) : (
          <FaBars size={24} />
        )}
        {isExpanded && (
          <span className='text-lg font-semibold'>Lovely Glam</span>
        )}
      </button>

      {/* Links */}
      <div className='flex flex-col space-y-8 w-full'>
        {(role === 'ROLE_USER' &&
          customerLinks.map((link) => (
            <Link
              key={link.title}
              href={link.path}
              className="flex items-center space-x-3 hover:bg-red-800 p-3 rounded-xl w-full transition-all duration-200"
            >
              <link.icon size={24} className="text-white" />
              {isExpanded && <span className="text-lg">{link.title}</span>}
            </Link>
          ))) ||
          (role === 'ROLE_NAILER' &&
            businessLinks.map((link) => (
              <Link
                key={link.title}
                href={link.path}
                className='flex items-center space-x-3 hover:bg-red-800 p-3 rounded-xl w-full transition-all duration-200'
              >
                <link.icon size={24} className='text-white' />
                {isExpanded && <span className='text-lg'>{link.title}</span>}
              </Link>
            ))) ||
          (role === 'ROLE_SYSTEM' &&
            adminLinks.map((link) => (
              <Link
                key={link.title}
                href={link.path}
                className='flex items-center space-x-3 hover:bg-red-800 p-3 rounded-xl w-full transition-all duration-200'
              >
                <link.icon size={24} className='text-white' />
                {isExpanded && <span className='text-lg'>{link.title}</span>}
              </Link>
            )))}
      </div>
      <button
        onClick={handleLogout}
        className='mt-auto flex items-center space-x-3 hover:bg-red-800 p-3 rounded-xl w-full transition-all duration-200'
      >
        <FaSignOutAlt size={24} className='text-white' />
        {isExpanded && <span className='text-lg'>Logout</span>}
      </button>
    </div>
  );
};

export default SideBar;
