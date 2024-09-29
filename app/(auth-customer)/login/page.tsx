'use client';
import { loginCustomer } from '@/app/_services/authService';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type LoginCredentials = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const res = await loginCustomer({
        username: loginCredentials.email,
        password: loginCredentials.password,
      });

      console.log('???');

      if (res.status === 200) {
        // save token to local storage
        const data = res.data.content;
        console.log(jwtDecode(data.accessToken));
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        const decodedToken = jwtDecode(data.accessToken) as any;
        const role = decodedToken.user.role;

        // redirect to dashboard
        if (role.toUpperCase() === 'ADMIN') {
          router.push('/admin');
        } else if (role.toUpperCase() === 'OWNER') {
          router.push('/owner');
        } else if (role.toUpperCase() === 'STAFF') {
          router.push('/staff/checkin');
        } else {
          router.push('/');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

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
            onChange={(e) => {
              setLoginCredentials({
                ...loginCredentials,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div className='flex flex-col space-y-2 w-full'>
          <div>Password</div>
          <input
            type='password'
            placeholder='Nhập password'
            className='input input-bordered'
            onChange={(e) => {
              setLoginCredentials({
                ...loginCredentials,
                password: e.target.value,
              });
            }}
          />
        </div>
        <button className='btn btn-primary px-8' onClick={() => handleLogin()}>
          Đăng nhập
        </button>
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
