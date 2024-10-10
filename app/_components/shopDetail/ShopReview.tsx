import Image from 'next/image';
import React from 'react';
import { Rating } from '../shop/ShopCard';

const ShopReview = () => {
  return (
    <div className='flex flex-col py-8'>
      <div className='flex space-x-4 items-center'>
        <Image
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/1024px-2023_Facebook_icon.svg.png'
          alt=''
          width={60}
          height={60}
        ></Image>
        <div className='flex flex-col'>
          <div className='font-bold'>Thảo</div>
          <div>02/07/2024</div>
        </div>
      </div>
      <div className='mt-2'>
        <Rating value={4.5} />
      </div>
      <div>Outstanding.</div>
    </div>
  );
};

export default ShopReview;
