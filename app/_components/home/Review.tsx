import Image from 'next/image';
import { Rating } from '../shop/ShopCard';

const Review = () => {
  return (
    <section className='p-12 bg-white'>
      <div className='container mx-auto'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
          Đánh giá về dịch vụ
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Review Card */}
          <div className='bg-gray-100 p-4 rounded-lg shadow'>
            <div className='flex items-center space-x-4'>
              <Image
                src='/images/user1.jpg'
                alt='User 1'
                width={50}
                height={50}
                className='rounded-full'
              />
              <div>
                <h3 className='font-bold'>Linh</h3>
                <p className='text-sm text-gray-500'>2 July 2024</p>
              </div>
            </div>
            <p className='mt-4'>Oatside - Great service, will use again!</p>
            <div className='mt-2 flex items-center'>
              {/* <span className='text-yellow-400'>★★★★★</span> */}
              <Rating value={3.5}></Rating>
            </div>
          </div>

          {/* Review Card 2 */}
          {/* <div className='bg-gray-100 p-4 rounded-lg shadow'>
            <div className='flex items-center space-x-4'>
              <Image
                src='/images/user2.jpg'
                alt='User 2'
                width={50}
                height={50}
                className='rounded-full'
              />
              <div>
                <h3 className='font-bold'>Uyển</h3>
                <p className='text-sm text-gray-500'>2 July 2024</p>
              </div>
            </div>
            <p className='mt-4'>Great experience, highly recommend.</p>
            <div className='mt-2 flex items-center'>
              <span className='text-yellow-400'>★★★★★</span>
            </div>
          </div> */}

          {/* More Review Cards... */}
        </div>
      </div>
    </section>
  );
};

export default Review;
