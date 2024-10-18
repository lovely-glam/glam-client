'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaBars, FaBuilding, FaCogs, FaHome, FaTimes, FaUser } from 'react-icons/fa';
import {checkUserRole} from '@/app/_services/tokenService';
const customerLinks = [
  { title: 'Thông tin', path: '/profile' },
  { title: 'Bảo mật', path: '/securiy' },
];

const businessLinks = [
  { title: 'Trang chủ', path: '/business/profile' },
  { title: 'Thống kê', path: '/business/dashboard' },
  { title: 'Khách hàng', path: '/business/customers' },
];

const adminLinks = [
  { title: 'Thống kê', path: '/admin/dashboard' },
  { title: 'Doanh nghiệp', path: '/admin/business' },
  { title: 'Khách hàng', path: '/admin/customers' },
];

const SideBar = () => {
  const [role, setRole] = useState<any>(null);

  useEffect(() => {
    const getUserRole = async () => {
      var role = await checkUser();
      setRole(role);
    }
    getUserRole();
  }, []);

  const checkUser = async (): Promise<string> => {
    const token = localStorage.getItem('accessToken');
    const role = await checkUserRole(token);
    console.log(role);
    return role.role;
  };
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className={`bg-gradient-to-b from-[#d46a6a] via-[#a23d3d] to-[#7e2f2f] text-white h-screen ${isExpanded ? 'w-64' : 'w-20'} flex flex-col items-center md:items-start p-4 py-12 rounded-tr-3xl shadow-lg transition-all duration-300`}>
      <button
        className="text-white flex items-center justify-center space-x-2 mb-8 w-full"
        onClick={toggleSidebar}
      >
        {isExpanded ? (
        <img src="/icon.ico" alt="Icon" className="w-10 h-10" />
    ) : <FaBars size={24} />}
        {isExpanded && <span className="text-lg font-semibold">Lovely Glam</span>}
      </button>


      {/* Links */}
      <div className="flex flex-col space-y-8 w-full">
        {(role === 'ROLE_USER' && customerLinks.map((link) => (
          <Link
            key={link.title}
            href={link.path}
            className="flex items-center space-x-3 hover:bg-red-800 p-3 rounded-xl w-full transition-all duration-200"
          >
            <FaUser size={24} className="text-white" />
            {isExpanded && <span className="text-lg">{link.title}</span>}
          </Link>
        ))) ||

          /* Business Links */
          (role === 'ROLE_NAILER' && businessLinks.map((link) => (
            <Link
              key={link.title}
              href={link.path}
              className="flex items-center space-x-3 hover:bg-red-800 p-3 rounded-xl w-full transition-all duration-200"
            >
              <FaBuilding size={24} className="text-white" />
              {isExpanded && <span className="text-lg">{link.title}</span>}
            </Link>
          ))) ||
          (role === 'ROLE_ADMIN' && adminLinks.map((link) => (
            <Link
              key={link.title}
              href={link.path}
              className="flex items-center space-x-3 hover:bg-red-800 p-3 rounded-xl w-full transition-all duration-200"
            >
              <FaCogs size={24} className="text-white" />
              {isExpanded && <span className="text-lg">{link.title}</span>}
            </Link>
          )))}
      </div>
    </div>
  );
};

export default SideBar;
