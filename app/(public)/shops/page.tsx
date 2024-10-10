import ShopCard from '@/app/_components/shop/ShopCard';
import React from 'react';

const Shops = () => {
  return (
    <div className='flex flex-col p-10 px-48 space-y-4'>
      <ShopCard
        id='1'
        name='Ting - Nail Art'
        rating={3.9}
        address='Vinhomes Grand Park - S7.03, Long Thạnh Mỹ, Quận 9, Hồ Chí Minh'
        services='Cutting, filling, shaping nails - 90.000VND'
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl0trD5QLjDCQpSPRTxMz5UBoF578pYDMxyw&s'
      />
      <ShopCard
        id='2'
        name='Miho - Nail Art'
        rating={4.5}
        address='Vinhomes Grand Park - S7.03, Long Thạnh Mỹ, Quận 9, Hồ Chí Minh'
        services='Cutting, filling, shaping nails - 90.000VND'
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl0trD5QLjDCQpSPRTxMz5UBoF578pYDMxyw&s'
      />
    </div>
  );
};

export default Shops;
