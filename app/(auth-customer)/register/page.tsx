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
