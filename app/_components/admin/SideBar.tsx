import { FaHome, FaUser } from 'react-icons/fa'; // You can use react-icons for icons

const SideBar = () => {
  return (
    <div className='bg-primary text-white h-screen w-2 md:w-32 flex flex-col items-center md:items-start p-4 rounded-tr-[90px]'>
      {/* Sidebar Header - Logo */}
      <div className='mb-20 mt-10'>
        <img src='/logo.png' alt='Lovely Glam' className='h-10 mb-4' />
      </div>

      {/* Sidebar Menu Items */}
      <div className='flex flex-col space-y-6'>
        {/* Dashboard Link */}
        <a
          href='#'
          className='flex items-center space-x-3 hover:bg-red-500 p-2 rounded-lg w-full'
        >
          <FaHome size={20} />
          <span className='hidden md:inline'>Trang chủ</span>
        </a>

        {/* User Profile */}
        <a
          href='#'
          className='flex items-center space-x-3 hover:bg-red-500 p-2 rounded-lg w-full'
        >
          <FaUser size={20} />
          <span className='hidden md:inline'>Tài khoản</span>
        </a>

        {/* Add more items as needed */}
        {/* Example: */}
        <a
          href='#'
          className='flex items-center space-x-3 hover:bg-red-500 p-2 rounded-lg w-full'
        >
          <FaUser size={20} />
          <span className='hidden md:inline'>Thông tin</span>
        </a>
      </div>
    </div>
  );
};

export default SideBar;
