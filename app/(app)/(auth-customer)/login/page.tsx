'use client';
import { loginCustomer } from '@/app/_services/authService';
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

const Login = () => {
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
      const res = await loginCustomer(loginCredentials);

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
        console.log(jwtDecode(data.accessToken));
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        const decodedToken = jwtDecode(data.accessToken) as any;
        const role = decodedToken.user.role;

        // redirect to dashboard
        if (localStorage.getItem('accessToken') !== undefined) {
          if (role.toUpperCase() === 'ADMIN') {
            router.push('/admin');
          } else if (role.toUpperCase() === 'OWNER') {
            router.push('/owner');
          } else if (role.toUpperCase() === 'STAFF') {
            router.push('/staff/checkin');
          } else {
            window.location.href = '/';
          }
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
    <div className='w-full h-screen p-8 flex justify-center'>
      <ToastContainer />
      <div className='flex flex-col space-y-4 items-center p-4 w-1/4 h-3/4 bg-white rounded-md drop-shadow-xl'>
        <div className='font-bold text-xl pt-4'>Đăng nhập</div>
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
