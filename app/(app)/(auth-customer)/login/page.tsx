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
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={40} height={40} viewBox="0 0 48 48">
            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          <div>Đăng nhập với Google</div>
        </button>
      </div>
    </div>
  );
};

export default Login;
