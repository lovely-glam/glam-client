'use client';
import { registerCustomer } from '@/app/_services/authService';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

type RegisterInfo = {
  username: string;
  email: string;
  fullName: string;
  password: string;
  rePassword: string;
};

const Register = () => {
  const router = useRouter();
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    username: '',
    email: '',
    fullName: '',
    password: '',
    rePassword: '',
  });
  const [errors, setErrors] = useState<RegisterInfo>({
    username: '',
    email: '',
    fullName: '',
    password: '',
    rePassword: '',
  });

  function validateForm() {
    let isValid = true;
    const newErrors = {
      username: '',
      email: '',
      fullName: '',
      password: '',
      rePassword: '',
    };

    if (registerInfo.fullName === undefined || registerInfo.fullName === '') {
      isValid = false;
      newErrors.fullName = 'Vui lòng nhập họ và tên';
    }
    if (registerInfo.username === undefined || registerInfo.username === '') {
      isValid = false;
      newErrors.username = 'Vui lòng nhập tên đăng nhập';
    }
    if (registerInfo.email === undefined || registerInfo.email === '') {
      isValid = false;
      newErrors.email = 'Vui lòng nhập email';
    }
    if (registerInfo.password === undefined || registerInfo.password === '') {
      isValid = false;
      newErrors.password = 'Vui lòng nhập mật khẩu';
    }
    if (
      registerInfo.rePassword === undefined ||
      registerInfo.rePassword === ''
    ) {
      isValid = false;
      newErrors.rePassword = 'Vui lòng nhập lại mật khẩu';
    }
    setErrors(newErrors);
    return isValid;
  }

  const handleRegister = async () => {
    if (validateForm()) {
      const registerToast = toast.loading('Đang đăng ký...', {
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
        const res = await registerCustomer(registerInfo);

        toast.update(registerToast, {
          render: 'Đăng ký thành công!',
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
          // redirect to login page
          router.push('/login');
        }
      } catch (error) {
        toast.update(registerToast, {
          render: 'Có lỗi xảy ra!',
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
    }
  };

  return (
    <div className='w-full h-full p-8 flex justify-center'>
      <ToastContainer />
      <div className='flex flex-col space-y-4 items-center p-4 w-1/3 h-[85%] bg-white rounded-md drop-shadow-xl'>
        <div className='font-bold text-xl pt-4'>Tạo tài khoản</div>
        <div className='flex flex-col w-full space-y-2'>
          <div>Họ và tên</div>
          <input
            type='text'
            placeholder='Nhập họ và tên'
            className='input input-bordered'
            onChange={(e) => {
              setRegisterInfo({
                ...registerInfo,
                fullName: e.target.value,
              });
            }}
          />
          {errors.fullName && (
            <div className='text-red-500'>{errors.fullName}</div>
          )}
        </div>
        <div className='flex flex-col space-y-2 w-full'>
          <div>Username</div>
          <input
            type='text'
            placeholder='Nhập username'
            className='input input-bordered'
            onChange={(e) => {
              setRegisterInfo({
                ...registerInfo,
                username: e.target.value,
              });
            }}
          />
          {errors.username && (
            <div className='text-red-500'>{errors.username}</div>
          )}
        </div>
        <div className='flex flex-col space-y-2 w-full'>
          <div>Email</div>
          <input
            type='text'
            placeholder='Nhập email'
            className='input input-bordered'
            onChange={(e) => {
              setRegisterInfo({
                ...registerInfo,
                email: e.target.value,
              });
            }}
          />
          {errors.email && <div className='text-red-500'>{errors.email}</div>}
        </div>
        <div className='flex flex-col space-y-2 w-full'>
          <div>Password</div>
          <input
            type='password'
            placeholder='Nhập password'
            className='input input-bordered'
            onChange={(e) => {
              setRegisterInfo({
                ...registerInfo,
                password: e.target.value,
              });
            }}
          />
          {errors.password && (
            <div className='text-red-500'>{errors.password}</div>
          )}
        </div>
        <div className='flex flex-col space-y-2 w-full'>
          <div>Xác nhận password</div>
          <input
            type='password'
            placeholder='Nhập lại password'
            className='input input-bordered'
            onChange={(e) => {
              setRegisterInfo({
                ...registerInfo,
                rePassword: e.target.value,
              });
            }}
          />
          {errors.rePassword && (
            <div className='text-red-500'>{errors.rePassword}</div>
          )}
        </div>
        <button className='btn btn-outline btn-info px-8 w-full flex'>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={40} height={40} viewBox="0 0 48 48">
            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
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
        <button
          className='btn btn-primary px-8'
          onClick={() => handleRegister()}
        >
          Đăng kí
        </button>
      </div>
    </div>
  );
};

export default Register;
