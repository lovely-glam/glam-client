import Image from 'next/image';
import { Rating } from '../shop/ShopCard';

const ShopCard = () => {
  return (
    <section className='p-12 bg-primary'>
      <div className='container mx-auto'>
        <div className='flex space-x-4'>
          <div className='flex-1 bg-white shadow-md rounded-lg overflow-hidden'>
            <Image
              src='/images/nail-salon.jpg'
              alt='Nail Salon'
              width={600}
              height={400}
              className='w-full h-64 object-cover'
            />
            <div className='p-4'>
              <h3 className='text-xl font-bold'>Ting - Nail Art</h3>
              <p className='text-gray-500'>
                Vinhomes Grand Park, Long Thạnh Mỹ, Quận 9, Hồ Chí Minh
              </p>
              <div className='flex items-center mt-2'>
                {/* <span className='text-yellow-400 text-lg'>★★★★★</span> */}
                <Rating value={3.5}></Rating>
                <span className='text-gray-600 ml-2'>(100 đánh giá)</span>
              </div>
            </div>
          </div>
          <div className='space-y-4'>
            <Image
              src='/images/nail-art-1.jpg'
              alt='Nail Art 1'
              width={150}
              height={100}
              className='w-48 h-32 object-cover rounded-lg'
            />
            <Image
              src='/images/nail-art-2.jpg'
              alt='Nail Art 2'
              width={150}
              height={100}
              className='w-48 h-32 object-cover rounded-lg'
            />
            <Image
              src='/images/nail-art-3.jpg'
              alt='Nail Art 3'
              width={150}
              height={100}
              className='w-48 h-32 object-cover rounded-lg'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopCard;
