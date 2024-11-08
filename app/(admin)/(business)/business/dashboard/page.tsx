'use-client';

import CustomerAcquisitionChart from '@/app/_components/business/CustomerAcquisitionChart';
import RevenueStatisticsChart from '@/app/_components/business/RevenueStatisticsChart';
import React from 'react';

const BusinessDashboard: React.FC = () => {
  // Giả sử các số liệu này được lấy từ API hoặc cơ sở dữ liệu
  const totalUsers = 1200; // Tổng số người dùng
  const activeUsers = 950; // Số người dùng hoạt động
  const totalBusinesses = 45; // Tổng số doanh nghiệp
  const totalRevenue = 458000; // Tổng doanh thu

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <main className='flex-1 p-6 space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          {/* User Management Statistics */}
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-gray-600 mb-4'>User Management</h3>
            <div className='space-y-4'>
              <div className='flex justify-between'>
                <p className='text-sm text-gray-500'>Total Users</p>
                <p className='text-xl font-semibold text-gray-700'>
                  {totalUsers}
                </p>
              </div>
              <div className='flex justify-between'>
                <p className='text-sm text-gray-500'>Active Users</p>
                <p className='text-xl font-semibold text-gray-700'>
                  {activeUsers}
                </p>
              </div>
            </div>
          </div>

          {/* Business Management Statistics */}
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-gray-600 mb-4'>Business Management</h3>
            <div className='space-y-4'>
              <div className='flex justify-between'>
                <p className='text-sm text-gray-500'>Total Businesses</p>
                <p className='text-xl font-semibold text-gray-700'>
                  {totalBusinesses}
                </p>
              </div>
              <div className='flex justify-between'>
                <p className='text-sm text-gray-500'>Total Revenue</p>
                <p className='text-xl font-semibold text-gray-700'>
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Statistics */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h3 className='text-gray-600 mb-4'>Revenue Statistics</h3>
          <RevenueStatisticsChart />
        </div>

        {/* Customer Acquisition */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h3 className='text-gray-600 mb-4'>Customer Acquisition</h3>
          <CustomerAcquisitionChart />
        </div>

        {/* Recent Orders and Quick Chat */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Recent Orders */}
          {/* ...Recent Orders content... */}

          {/* Top Countries */}
          {/* <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-gray-600 mb-4'>Top Countries</h3>
            <TopCountriesChart />
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default BusinessDashboard;
