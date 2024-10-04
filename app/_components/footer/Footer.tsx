import Image from 'next/image';
import React from 'react';
import { TiMail, TiPhoneOutline } from 'react-icons/ti';

const Footer = () => {
  return (
    <footer className='bg-accent p-6 pb-8'>
      <div className='flex justify-evenly'>
        {/* Left Section: Lovely Glam details */}
        <div className='space-y-6'>
          <h2 className='font-bold text-lg'>Lovely Glam</h2>
          <ul className='mt-2 space-y-2 text-neutral'>
            <li className='flex items-center space-x-2'>
              <TiPhoneOutline size={20} /> <div>0394849241</div>
            </li>
            <li className='flex items-center space-x-2'>
              <TiMail size={22} /> <div>LovelyGlam@gmail.com</div>
            </li>
          </ul>
          <div className='flex space-x-4 mt-4'>
            <a href='#' className='text-blue-600'>
              <Image
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/1024px-2023_Facebook_icon.svg.png'
                width={40}
                height={40}
                alt='Facebook'
              />
            </a>
            <a href='#' className='text-pink-500'>
              <Image
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/1024px-2023_Facebook_icon.svg.png'
                width={40}
                height={40}
                alt='TikTok'
              />
            </a>
            <a href='#' className='text-purple-500'>
              <Image
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/1024px-2023_Facebook_icon.svg.png'
                width={40}
                height={40}
                alt='Instagram'
              />
            </a>
          </div>
        </div>

        {/* Center Section: Điều khoản with left border */}
        <div className='border-l border-neutral px-8 space-y-6'>
          <h2 className='font-bold text-lg'>Điều khoản</h2>
          <ul className='mt-2 space-y-2 text-neutral'>
            <li>
              <a href='#'>Chính sách bảo mật</a>
            </li>
            <li>
              <a href='#'>Hỗ trợ đối tác</a>
            </li>
            <li>
              <a href='#'>Điều khoản dịch vụ</a>
            </li>
            <li>
              <a href='#'>Điều khoản sử dụng</a>
            </li>
          </ul>
        </div>

        {/* Right Section: Cửa hàng liên kết with left border */}
        <div className='border-l border-neutral px-8 space-y-6'>
          <h2 className='font-bold text-lg'>CỬA HÀNG LIÊN KẾT</h2>
          <ul className='mt-2 space-y-2 text-neutral'>
            <li>
              <strong>Nays.nail</strong>: Vinhomes Grand Park - S105, Long Thạnh
              Mỹ, Quận 9, Hồ Chí Minh
            </li>
            <li>
              <strong>10AM - Nail Art</strong>: Vinhomes Grand Park - S703, Long
              Thạnh Mỹ, Quận 9, Hồ Chí Minh
            </li>
            <li>
              <strong>Minny Nails</strong>: 208 Lã Xuân Oai, Tăng Nhơn Phú A,
              Quận 9, Hồ Chí Minh
            </li>
            <li>307 Man Thiện, Phường Tân Phú, Quận 9, Hồ Chí Minh</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
