import React from 'react';
import ShopCard from '../_components/shop/ShopCard';

const Shops = () => {
  return (
    <div className='flex flex-col p-10 space-y-4'>
      <ShopCard
        name='Ting - Nail Art'
        rating={3.9}
        address='Vinhomes Grand Park - S7.03, Long Thạnh Mỹ, Quận 9, Hồ Chí Minh'
        services='Cutting, filling, shaping nails - 90.000VND'
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl0trD5QLjDCQpSPRTxMz5UBoF578pYDMxyw&s'
      />
      <ShopCard
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
