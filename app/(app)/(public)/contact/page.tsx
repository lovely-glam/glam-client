'use client';

const Contact = () => {
  const handleSubmit = () => {};

  return (
    <div className='bg-gray-50 min-h-screen flex flex-col items-center justify-center'>
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
              className='w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary'
              placeholder='Nhập tin nhắn của bạn'
              rows={4}
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
