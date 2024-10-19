import React from 'react';

const BusinessServices = () => {
  return (
    <div className='p-8 w-full'>
      <div className='text-3xl font-bold text-center mb-6'>
        Quản lí đơn hàng
      </div>
      <div className='overflow-x-auto'>
        <table className='table-auto w-full border-collapse border border-primary'>
          {/* head */}
          <thead>
            <tr className='bg-primary text-white'>
              <th className='border border-primary p-2'>STT</th>
              <th className='border border-primary p-2'>Ngày</th>
              <th className='border border-primary p-2'>Giờ</th>
              <th className='border border-primary p-2'>Dịch vụ</th>
              <th className='border border-primary p-2'>Doanh thu</th>
              <th className='border border-primary p-2'>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td className='border border-primary p-2 text-center'>1</td>
              <td className='border border-primary p-2'>20/10/2024</td>
              <td className='border border-primary p-2'>11AM</td>
              <td className='border border-primary p-2'>Cắt móng tay</td>
              <td className='border border-primary p-2'>1.000.000 vnd</td>
              <td className='border border-primary p-2'></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusinessServices;
