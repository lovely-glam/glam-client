'use client';
import {
  loginBusiness,
  loginCustomer,
  loginSystem,
} from '@/app/_services/authService';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

type LoginCredentials = {
  username: string;
  password: string;
};

const LoginAdmin = () => {
  const router = useRouter();
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });

  const handleLogin = async () => {
    const loginToast = toast.loading('Đang đăng nhập...', {
      toastId: 'loginToast',
      autoClose: false,
      closeOnClick: false,
      hideProgressBar: true,
      draggable: false,
      position: 'bottom-right',
      pauseOnHover: false,
      progress: undefined,
      theme: 'light',
    });

    try {
      const res = await loginSystem(loginCredentials);

      toast.update(loginToast, {
        render: 'Đăng nhập thành công!',
        type: 'success',
        isLoading: false,
        autoClose: 2500,
        position: 'bottom-right',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
      });

      if (res.status === 200) {
        // save token to local storage
        const data = res.data.content;
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        const decodedToken = jwtDecode(data.accessToken) as any;
        const role = decodedToken.user.role;

        // redirect to dashboard
        if (localStorage.getItem('accessToken') !== undefined) {
          window.location.href = '/admin';
        }
      }
    } catch (error) {
      toast.update(loginToast, {
        render: 'Tên đăng nhập hoặc mật khẩu không tồn tại!',
        type: 'error',
        isLoading: false,
        autoClose: 2500,
        position: 'bottom-right',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <div className='w-full h-1/3 p-8 flex justify-center'>
      <ToastContainer />
      <div className='flex flex-col space-y-4 items-center p-4 w-1/4 h-3/4 bg-white rounded-md drop-shadow-xl'>
        <div className='font-bold text-xl pt-4'>Đăng nhập hệ thống</div>
        <div className='flex flex-col space-y-2 w-full'>
          <div>Username</div>
          <input
            type='text'
            placeholder='Nhập username'
            className='input input-bordered'
            onChange={(e) => {
              setLoginCredentials({
                ...loginCredentials,
                username: e.target.value,
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
        {/* <div className='flex justify-between w-full'>
          <Link href='/register-business' className='text-info'>
            Đăng ký
          </Link>
          <Link href='/forgot-password' className='text-info'>
            Quên mật khẩu
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default LoginAdmin;
