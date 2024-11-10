'use client';
import { submitContact } from "@/app/_services/userService";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Contact = () => {
  const [contact, setContact] = useState<{contactName: string; email: string; message: string}>({
    contactName: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updateToast = toast.loading('Updating', {
      toastId: 'contactCreateToast',
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
      const result = await submitContact(contact);
      if (result.status === 200 && result.data.success) {
        toast.update(updateToast, {
          render: 'Create Success',
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
      } else {
        toast.update(updateToast, {
          render: 'Create Failed',
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
    } catch (err) {
      toast.update(updateToast, {
        render: 'Update Failed',
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
    <div className='bg-gray-50 min-h-screen flex flex-col items-center justify-center'>
      <ToastContainer />
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center'>
        <h1 className='text-3xl font-bold text-primary mb-4'>Lovely Glam</h1>
        <p className='text-gray-700 mb-6'>
          Nâng tầm trải nghiệm làm đẹp của bạn.
        </p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-left text-gray-600 font-semibold mb-1'>
              Tên của bạn
            </label>
            <input
              type='text'
              name='contactName'
              value={contact.contactName}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary'
              placeholder='Nhập tên của bạn'
              required
            />
          </div>
          <div>
            <label className='block text-left text-gray-600 font-semibold mb-1'>
              Email
            </label>
            <input
              type='email'
              name='email'
              value={contact.email}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary'
              placeholder='Nhập email của bạn'
              required
            />
          </div>
          <div>
            <label className='block text-left text-gray-600 font-semibold mb-1'>
              Tin nhắn của bạn
            </label>
            <textarea
              name='message'
              className='w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary'
              placeholder='Nhập tin nhắn của bạn'
              rows={4}
              value={contact.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button
            type='submit'
            className='w-full py-2 bg-primary text-white font-bold rounded-md hover:bg-red-900 transition'
          >
            Gửi tin nhắn
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
