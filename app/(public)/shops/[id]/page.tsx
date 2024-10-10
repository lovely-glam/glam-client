import { Rating, RatingLarge } from '@/app/_components/shop/ShopCard';
import ShopReview from '@/app/_components/shopDetail/ShopReview';
import ShopService from '@/app/_components/shopDetail/ShopService';
import React from 'react';

const ShopDetail = () => {
  return (
    <div className='p-10 flex flex-col space-y-6 px-40'>
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
      <div className='space-y-2'>
        <p className='font-bold text-2xl italic'>Đánh giá</p>
        <RatingLarge value={4.5} />
        <p>
          4.5 <span className='text-info'>(96)</span>
        </p>
        <table className='table-auto w-full'>
          <tbody>
            <tr>
              <td>
                <ShopReview />
              </td>
              <td>
                <ShopReview />
              </td>
              <td>
                <ShopReview />
              </td>
            </tr>
            <tr>
              <td>
                <ShopReview />
              </td>
              <td>
                <ShopReview />
              </td>
              <td>
                <ShopReview />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShopDetail;
