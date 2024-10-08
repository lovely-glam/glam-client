import Image from 'next/image';
import { Rating } from '../shop/ShopCard';

const Website = () => {
  return (
    <section className='p-12 bg-white'>
      <div className='px-20'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
          Đánh giá về website
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Website Review Card */}
          <div className='bg-gray-100 p-4 rounded-lg shadow'>
            <div className='flex items-center space-x-4'>
              <Image
                src='/images/user3.jpg'
                alt='User 3'
                width={50}
                height={50}
                className='rounded-full'
              />
              <div>
                <h3 className='font-bold'>Thảo</h3>
                <p className='text-sm text-gray-500'>2 July 2024</p>
              </div>
            </div>
            <p className='mt-4'>The website was easy to navigate.</p>
            <div className='mt-2 flex items-center'>
              {/* <span className='text-yellow-400'>★★★★★</span> */}
              <Rating value={3.5}></Rating>
            </div>
          </div>

          {/* Add more Website Review Cards... */}
        </div>
      </div>
    </section>
  );
};

export default Website;
