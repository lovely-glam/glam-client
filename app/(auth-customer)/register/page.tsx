import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Register = () => {
  return (
    <div className='w-full h-screen p-8 flex justify-center'>
      <div className='flex flex-col space-y-4 items-center p-4 w-1/3 h-[85%] bg-white rounded-md drop-shadow-xl'>
        <div className='font-bold text-xl pt-4'>Tạo tài khoản</div>
        <div className='flex w-full space-x-6'>
          <div className='flex flex-col'>
            <div>Họ</div>
            <input
              type='text'
              placeholder='Nhập họ và tên đệm'
              className='input input-bordered'
            />
          </div>
          <div className='flex flex-col'>
            <div>Tên</div>
            <input
              type='text'
              placeholder='Nhập tên'
              className='input input-bordered'
            />
          </div>
        </div>
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
        <button className='btn btn-outline btn-info px-8 w-full flex'>
          <Image
            src='https://lovely-glam.hcm.ss.bfcplatform.vn/eb131115-22e9-4e88-b4cb-02071f0f1ba2-google.png'
            width={20}
            height={20}
            alt='Google'
          />
          <div>Tiếp tục với Google</div>
        </button>
        <div className='flex items-center w-full'>
          <hr className='flex-grow border-t border-black' />
        </div>
        <div className='flex justify-between w-full'>
          <Link href='/login' className='text-info'>
            Đăng nhập
          </Link>
          <Link href='/forgot-password' className='text-info'>
            Quên mật khẩu
          </Link>
        </div>
        <button className='btn btn-primary px-8'>Đăng kí</button>
      </div>
    </div>
  );
};

export default Register;
