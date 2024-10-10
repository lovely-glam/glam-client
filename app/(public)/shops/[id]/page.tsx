import ShopService from '@/app/_components/shopDetail/ShopService';
import React from 'react';

const ShopDetail = () => {
  return (
    <div className='p-10 flex flex-col space-y-8 px-20'>
      <div className='flex flex-col justify-center items-center space-y-4'>
        <div className='font-bold text-5xl'>Shop Name</div>
        <div className='min-h-screen'>Photos</div>
      </div>
      <div className='font-bold text-2xl italic'>Dịch vụ</div>
      <div className='flex flex-col space-y-4'>
        <ShopService />
        <ShopService />
        <ShopService />
        <ShopService />
      </div>
      <div className='font-bold text-2xl italic'>Đánh giá</div>
    </div>
  );
};

export default ShopDetail;
