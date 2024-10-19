'use client';
import React, { useEffect, useState } from 'react';

const BusinessCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // const res = await getBusinessCustomers();
        // setCustomers(res);
      } catch (error) {
        console.error('Failed to fetch customer data:', error);
      }
    };
    fetchCustomers();
  }, []);
  return (
    <div className='p-8 w-full'>
      <div className='text-3xl font-bold text-center mb-6'>
        Thông tin khách hàng
      </div>
      <div className='overflow-x-auto'>
        <table className='table-auto w-full border-collapse border border-primary'>
          {/* head */}
          <thead>
            <tr className='bg-primary text-white'>
              <th className='border border-primary p-2'>STT</th>
              <th className='border border-primary p-2'>Tên</th>
              <th className='border border-primary p-2'>Ngày sinh</th>
              <th className='border border-primary p-2'>SĐT</th>
              <th className='border border-primary p-2'>Gmail</th>
              <th className='border border-primary p-2'>Số lần đặt lịch</th>
              <th className='border border-primary p-2'>Doanh thu</th>
              <th className='border border-primary p-2'>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td className='border border-primary p-2 text-center'>1</td>
              <td className='border border-primary p-2'>Thảo</td>
              <td className='border border-primary p-2'>29/10/2003</td>
              <td className='border border-primary p-2'>0394849241</td>
              <td className='border border-primary p-2'>thaopt@gmail.com</td>
              <td className='border border-primary p-2 text-center'>5</td>
              <td className='border border-primary p-2 text-right'>
                1.450.000
              </td>
              <td className='border border-primary p-2'></td>
            </tr>
            {/* row 2 */}
            <tr>
              <td className='border border-primary p-2 text-center'>2</td>
              <td className='border border-primary p-2'>Uyên</td>
              <td className='border border-primary p-2'>23/04/2005</td>
              <td className='border border-primary p-2'>0946873685</td>
              <td className='border border-primary p-2'>uyen20@gmail.com</td>
              <td className='border border-primary p-2 text-center'>1</td>
              <td className='border border-primary p-2 text-right'>240.000</td>
              <td className='border border-primary p-2'></td>
            </tr>
            {/* row 3 */}
            <tr>
              <td className='border border-primary p-2 text-center'>3</td>
              <td className='border border-primary p-2'>Vy</td>
              <td className='border border-primary p-2'>27/09/2000</td>
              <td className='border border-primary p-2'>0424864368</td>
              <td className='border border-primary p-2'>vyyyne@gmail.com</td>
              <td className='border border-primary p-2 text-center'>3</td>
              <td className='border border-primary p-2 text-right'>410.000</td>
              <td className='border border-primary p-2'></td>
            </tr>
            {/* row 4 */}
            <tr>
              <td className='border border-primary p-2 text-center'>4</td>
              <td className='border border-primary p-2'>Trâm</td>
              <td className='border border-primary p-2'>14/05/2001</td>
              <td className='border border-primary p-2'>05325787542</td>
              <td className='border border-primary p-2'>tramyt@gmail.com</td>
              <td className='border border-primary p-2 text-center'>5</td>
              <td className='border border-primary p-2 text-right'>570.000</td>
              <td className='border border-primary p-2'></td>
            </tr>
            {/* row 5 */}
            <tr>
              <td className='border border-primary p-2 text-center'>5</td>
              <td className='border border-primary p-2'>Quỳnh</td>
              <td className='border border-primary p-2'>02/01/1999</td>
              <td className='border border-primary p-2'>0643568963</td>
              <td className='border border-primary p-2'>quynh2689@gmail.com</td>
              <td className='border border-primary p-2 text-center'>2</td>
              <td className='border border-primary p-2 text-right'>
                1.200.000
              </td>
              <td className='border border-primary p-2'></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusinessCustomers;
