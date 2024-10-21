'use client';
import SideBar from '@/app/_components/admin/SideBar';
import { getCurrentUser, updateUser } from '@/app/_services/userService';
import { uploadFile } from '@/app/_services/workerService';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const token = localStorage.getItem('accessToken');

    if (token !== null && token !== undefined) {
      // TODO: get profile
      const res: any = await getCurrentUser();

      if (res.status === 200) {
        setUser(res.data.content);
        setFullName(res.data.content.fullName);
        setEmail(res.data.content.email);
        setUsername(res.data.content.username);
      }
    }
  };

  const changeAvatar = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Open file dialog
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'image/png') {
        const formData = new FormData();
        formData.append('file', file);
        const res = await uploadFile(formData);
        setUser({ ...user, avatarUrl: res.data.content });

        // update avatarUrl
        const updateRes = await updateUser({
          ...user,
          avatarUrl: res.data.content,
        });

        // show toast message
        if (updateRes.status === 200)
          toast.success('Đổi ảnh thành công!', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      } else {
        alert('Vui lòng sử dụng hình ảnh định dạng PNG.');
      }
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const changeInformation = async () => {
    try {
      const updatedUser = {
        ...user,
        fullName,
        email,
        username,
      };

      const res = await updateUser(updatedUser);

      if (res.status === 200) {
        setUser(updatedUser);

        // show success toast
        toast.success('Cập nhật thông tin thành công!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        throw new Error('Cập nhật thông tin thất bại');
      }
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className='flex'>
      <ToastContainer />
      <SideBar />
      {user && (
        <div className='flex w-full p-12 flex-col space-y-8'>
          <div className='text-3xl text-black font-bold w-full text-center'>
            Thông tin cá nhân
          </div>
          <div className='flex justify-center mb-8 space-x-8'>
            <div className='space-y-4 flex flex-col items-center mt-8'>
              <div className='w-36 h-36 rounded-full overflow-hidden'>
                <Image
                  src={
                    isValidUrl(user?.avatarUrl ?? '')
                      ? user?.avatarUrl
                      : '/icon.ico'
                  }
                  width={1024}
                  height={1024}
                  alt='Profile avatar'
                  className='w-full h-full object-cover'
                />
              </div>
              <button className='btn btn-primary w-2/3' onClick={changeAvatar}>
                Đổi ảnh
              </button>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/png'
                className='hidden'
                onChange={handleFileChange}
              />
            </div>
            <div className='text-xl font-semibold space-y-4'>
              <div className='space-y-2'>
                <p>Họ và tên:</p>
                <input
                  type='text'
                  placeholder='Type here'
                  className='input input-bordered w-80 font-normal'
                  defaultValue={user.fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className='space-y-2'>
                <p>Email:</p>
                <input
                  type='text'
                  placeholder='Type here'
                  className='input input-bordered w-full max-w-xs font-normal'
                  defaultValue={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='space-y-2'>
                <p>Tên người dùng:</p>
                <input
                  type='text'
                  placeholder='Type here'
                  className='input input-bordered w-full max-w-xs font-normal'
                  defaultValue={user.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='mt-8 flex justify-end w-full'>
                <button className='btn btn-primary' onClick={changeInformation}>
                  Chỉnh sửa thông tin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
