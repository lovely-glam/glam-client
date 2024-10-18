'use client';
import SideBar from '@/app/_components/admin/SideBar';
import { getCurrentUser, updateUser } from '@/app/_services/userService';
import { uploadFile } from '@/app/_services/workerService';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
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
        console.log(res.data);
        setUser(res.data.content);
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
        console.log('File is valid PNG:', file);
        const formData = new FormData();
        formData.append('file', file);
        const res = await uploadFile(formData);
        setUser({ ...user, avatarUrl: res.data.content });

        // update avatarUrl
        const updateRes = await updateUser({
          ...user,
          avatarUrl: res.data.content,
        });
        console.log(updateRes);

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
        alert('Please upload a PNG image.');
      }
    }
  };

  console.log(user);

  const changeInformation = async () => {};

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
                  src={user?.avatarUrl || ''}
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
                />
              </div>
              <div className='space-y-2'>
                <p>Email:</p>
                <input
                  type='text'
                  placeholder='Type here'
                  className='input input-bordered w-full max-w-xs font-normal'
                  defaultValue={user.email}
                />
              </div>
              <div className='space-y-2'>
                <p>Tên người dùng:</p>
                <input
                  type='text'
                  placeholder='Type here'
                  className='input input-bordered w-full max-w-xs font-normal'
                  defaultValue={user.username}
                />
              </div>
              <div className='mt-8 flex justify-end w-full'>
                <button className='btn btn-primary'>Chỉnh sửa thông tin</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
