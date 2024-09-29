import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Login = () => {
  return (
    <div className='w-full h-screen p-8 flex justify-center'>
      <div className='flex flex-col space-y-4 items-center p-4 w-1/4 h-3/4 bg-white rounded-md drop-shadow-xl'>
        <div className='font-bold text-xl pt-4'>Đăng nhập</div>
        <div className='flex flex-col space-y-2 w-full'>
          <div>Email</div>
          <input
            type='text'
            placeholder='Nhập email'
            className='input input-bordered'
          />
        </div>
        <div className='flex flex-col space-y-2 w-full'>
          <div>Password</div>
          <input
            type='text'
            placeholder='Nhập password'
            className='input input-bordered'
          />
        </div>
        <button className='btn btn-primary px-8'>Đăng nhập</button>
        <div className='flex justify-between w-full'>
          <Link href='/register' className='text-info'>
            Tạo tài khoản
          </Link>
          <Link href='/forgot-password' className='text-info'>
            Quên mật khẩu
          </Link>
        </div>
        <div className='flex items-center w-full'>
          <hr className='flex-grow border-t border-black' />
          <span className='mx-2'>hoặc</span>
          <hr className='flex-grow border-t border-black' />
        </div>
        <button className='btn btn-outline btn-info px-8 w-full flex'>
          <Image
            src='https://lovely-glam.hcm.ss.bfcplatform.vn/eb131115-22e9-4e88-b4cb-02071f0f1ba2-google.png'
            width={20}
            height={20}
            alt='Google'
          />
          <div>Đăng nhập với Google</div>
        </button>
      </div>
    </div>
  );
};

export default Login;
