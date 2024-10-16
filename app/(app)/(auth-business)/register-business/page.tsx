"use client"

import { toast, ToastContainer } from 'react-toastify';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { registerBusiness } from '@/app/_services/authService';

const RegisterBusiness = () => {
  type RegisterInfo = {
    username: string;
    email: string;
    name: string;
    password: string;
    rePassword: string;
    ownerFirstName?: string;
    ownerLastName: string;
    ownerPersonalIdentity: string;
    businessCode: string;
    avatarUrl: string;
    thumpNails: string[];
    description: string;
    address: string;
  };
  const router = useRouter();
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    username: '',
    email: '',
    name: '',
    password: '',
    rePassword: '',
    ownerFirstName: '',
    ownerLastName: '',
    ownerPersonalIdentity: '',
    businessCode: '',
    avatarUrl: '',
    thumpNails: [],
    description: '',
    address: ''
  });
  const [errors, setErrors] = useState<RegisterInfo>({
    username: '',
    email: '',
    name: '',
    password: '',
    rePassword: '',
    ownerFirstName: '',
    ownerLastName: '',
    ownerPersonalIdentity: '',
    businessCode: '',
    avatarUrl: '',
    thumpNails: [],
    description: '',
    address: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors: RegisterInfo = {
      username: '',
      email: '',
      name: '',
      password: '',
      rePassword: '',
      ownerFirstName: '',
      ownerLastName: '',
      ownerPersonalIdentity: '',
      businessCode: '',
      avatarUrl: '',
      thumpNails: [],
      description: '',
      address: ''
    };
    if (!registerInfo.name) {
      isValid = false;
      newErrors.name = 'Vui lòng nhập họ và tên';
    }

    if (!registerInfo.username) {
      isValid = false;
      newErrors.username = 'Vui lòng nhập tên đăng nhập';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!registerInfo.email) {
      isValid = false;
      newErrors.email = 'Vui lòng nhập email';
    } else if (!emailRegex.test(registerInfo.email)) {
      isValid = false;
      newErrors.email = 'Email không hợp lệ';
    }

    if (!registerInfo.password) {
      isValid = false;
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (registerInfo.password.length < 6) {
      isValid = false;
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!registerInfo.rePassword) {
      isValid = false;
      newErrors.rePassword = 'Vui lòng nhập lại mật khẩu';
    } else if (registerInfo.rePassword !== registerInfo.password) {
      isValid = false;
      newErrors.rePassword = 'Mật khẩu không khớp';
    }

    if (!registerInfo.ownerFirstName) {
      newErrors.ownerFirstName = 'Vui lòng nhập tên chủ sở hữu';
    }

    if (!registerInfo.ownerLastName) {
      newErrors.ownerLastName = 'Vui lòng nhập họ chủ sở hữu';
    }

    if (!registerInfo.businessCode) {
      newErrors.businessCode = 'Vui lòng nhập mã số kinh doanh';
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
        const res = await registerBusiness(registerInfo);

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
    <div className="w-full h-full p-8 flex justify-center bg-gray-100">
      <ToastContainer />
      <div className="flex flex-col space-y-8 items-center p-6 w-1/3 bg-white rounded-lg shadow-lg">
        <h1 className="font-bold text-3xl text-center">Tạo tài khoản</h1>

        <h2 className="font-semibold text-xl">Thông tin cá nhân</h2>

        {/* Owner First Name */}
        <div className="flex flex-col w-full">
          <label className="font-medium">Họ</label>
          <input
            type="text"
            placeholder="Nhập họ"
            className="input input-bordered mt-1 mb-2"
            onChange={(e) => setRegisterInfo({ ...registerInfo, ownerFirstName: e.target.value })}
          />
          {errors.ownerFirstName && <p className="text-red-500 text-sm">{errors.ownerFirstName}</p>}
        </div>

        {/* Owner Last Name */}
        <div className="flex flex-col w-full">
          <label className="font-medium">Tên</label>
          <input
            type="text"
            placeholder="Nhập tên"
            className="input input-bordered mt-1 mb-2"
            onChange={(e) => setRegisterInfo({ ...registerInfo, ownerLastName: e.target.value })}
          />
          {errors.ownerLastName && <p className="text-red-500 text-sm">{errors.ownerLastName}</p>}
        </div>

        {/* Personal Identity */}
        <div className="flex flex-col w-full">
          <label className="font-medium">CCCD</label>
          <input
            type="text"
            placeholder="Nhập CMND/CCCD"
            className="input input-bordered mt-1 mb-2"
            onChange={(e) => setRegisterInfo({ ...registerInfo, ownerPersonalIdentity: e.target.value })}
          />
          {errors.ownerPersonalIdentity && <p className="text-red-500 text-sm">{errors.ownerPersonalIdentity}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col w-full">
          <label className="font-medium">Email</label>
          <input
            type="email"
            placeholder="Nhập email"
            className="input input-bordered mt-1 mb-2"
            onChange={(e) => setRegisterInfo({ ...registerInfo, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <h2 className="font-semibold text-xl">Thông tin doanh nghiệp</h2>

        {/* Business Name */}
        <div className="flex flex-col w-full">
          <label className="font-medium">Tên doanh nghiệp</label>
          <input
            type="text"
            placeholder="Nhập tên doanh nghiệp"
            className="input input-bordered mt-1 mb-2"
            onChange={(e) => setRegisterInfo({ ...registerInfo, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Business Code */}
        <div className="flex flex-col w-full">
          <label className="font-medium">Mã số doanh nghiệp</label>
          <input
            type="text"
            placeholder="Nhập mã số thuế hoặc mã số đăng ký doanh nghiệp"
            className="input input-bordered mt-1 mb-2"
            onChange={(e) => setRegisterInfo({ ...registerInfo, businessCode: e.target.value })}
          />
          {errors.businessCode && <p className="text-red-500 text-sm">{errors.businessCode}</p>}
        </div>

        {/* Address */}
        <div className="flex flex-col w-full">
          <label className="font-medium">Địa chỉ</label>
          <input
            type="text"
            placeholder="Nhập địa chỉ"
            className="input input-bordered mt-1 mb-2"
            onChange={(e) => setRegisterInfo({ ...registerInfo, address: e.target.value })}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        <h2 className="font-semibold text-xl">Thông tin đăng nhập</h2>

        {/* Username */}
        <div className="flex flex-col w-full">
          <label className="font-medium">Username</label>
          <input
            type="text"
            placeholder="Nhập username"
            className="input input-bordered mt-1 mb-2"
            onChange={(e) => setRegisterInfo({ ...registerInfo, username: e.target.value })}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col w-full">
          <label className="font-medium">Password</label>
          <input
            type="password"
            placeholder="Nhập password"
            className="input input-bordered mt-1 mb-2"
            onChange={(e) => setRegisterInfo({ ...registerInfo, password: e.target.value })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col w-full">
          <label className="font-medium">Xác nhận password</label>
          <input
            type="password"
            placeholder="Nhập lại password"
            className="input input-bordered mt-1 mb-2"
            onChange={(e) => setRegisterInfo({ ...registerInfo, rePassword: e.target.value })}
          />
          {errors.rePassword && <p className="text-red-500 text-sm">{errors.rePassword}</p>}
        </div>

        <div className="flex items-center w-full">
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <button
          className="btn btn-primary px-8 py-2 mt-4"
          onClick={() => handleRegister()}
        >
          Đăng kí
        </button>
      </div>
    </div>
  );
};

export default RegisterBusiness;
