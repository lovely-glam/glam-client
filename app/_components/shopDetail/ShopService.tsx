import React from 'react';

const ShopService = () => {
  return (
    <div className='bg-base-100 shadow-xl p-8 rounded-3xl border-black border-2'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
          <div>Cắt, dũa và định hình móng</div>
          <div>20 phút</div>
          <div>90.000 VND</div>
        </div>
        <button className='btn btn-primary text-accent font-bold px-8 rounded-full'>
          Book
        </button>
      </div>
    </div>
  );
};

export default ShopService;
