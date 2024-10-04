import Link from 'next/link';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const ForgotPassword = () => {
  return (
    <div className='w-full h-screen p-8 flex justify-center items-center'>
      <ToastContainer />
      <div className='flex flex-col space-y-4 items-center p-4 w-1/4 bg-white rounded-md drop-shadow-xl'>
        <div className='font-bold text-xl pt-4'>Tìm mật khẩu</div>
        <div className='flex flex-col space-y-2 w-full'>
          <div>Email hoặc username</div>
          <input
            type='text'
            placeholder='Nhập email hoặc username'
            className='input input-bordered'
            // onChange={(e) => {
            //   setLoginCredentials({
            //     ...loginCredentials,
            //     username: e.target.value,
            //   });
            // }}
          />
        </div>
        <button
          className='btn btn-primary px-8'
          // onClick={() => handleLogin()}
        >
          Tìm kiếm
        </button>
        <div className='flex items-center w-full'>
          <hr className='flex-grow border-t border-black' />
          <span className='mx-2'>hoặc</span>
          <hr className='flex-grow border-t border-black' />
        </div>
        <div className='flex justify-between w-full'>
          <Link href='/register' className='text-info'>
            Tạo tài khoản
          </Link>
          <Link href='/login' className='text-info'>
            Đã có tài khoản?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
