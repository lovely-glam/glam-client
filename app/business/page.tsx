import Link from 'next/link';
import React from 'react';

const Business = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-8 p-4'>
      <div className='text-4xl text-primary font-bold'>Đăng ký tài khoản</div>
      <div className='flex justify-center space-x-24'>
        <div className='flex flex-col items-center w-1/4 space-y-4'>
          <div className='bg-secondary w-72 h-48 rounded-3xl'></div>
          <div className='font-bold'>Tài khoản cá nhân</div>
          <div>
            <div className='italic'>
              Khách hàng dễ dàng đặt lịch trực tuyến, tránh tình trạng quá tải
              tại cửa hàng.
            </div>
            <div className='italic'>
              Khách hàng có thể đánh giá dịch vụ, giúp cửa hàng cải thiện chất
              lượng.
            </div>
          </div>
          <Link href='/login' className='btn btn-primary'>
            Tạo tài khoản cá nhân
          </Link>
        </div>
        <div className='flex flex-col items-center w-1/4 space-y-4'>
          <div className='bg-secondary w-72 h-48 rounded-3xl'></div>
          <div className='font-bold'>Tài khoản doanh nghiệp</div>
          <div>
            <div className='italic'>
              Cửa hàng dễ dàng quản lí lịch hẹn, theo dõi doanh thu và phân tích
              hiệu quả kinh doanh.
            </div>
            <div className='italic'>
              Hỗ trợ cửa hàng trong việc thu hút và giữ chân khách hàng.
            </div>
          </div>
          <Link href='/login' className='btn btn-primary'>
            Tạo tài khoản doanh nghiệp
          </Link>
        </div>
      </div>
      <div>
        Bạn đã có tài khoản? Hãy{' '}
        <Link href='/login' className='text-primary'>
          đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default Business;
