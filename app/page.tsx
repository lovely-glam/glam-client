import Image from 'next/image';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function Home() {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <section className='relative bg-pink-100 py-16 h-max'>
        <div className='container mx-auto text-center'>
          <Image />
          {/* Search bar */}
          <div className='relative mx-auto max-w-lg'>
            <input
              type='text'
              placeholder='Search for services or locations'
              className='input input-bordered w-full pl-10'
            />
            <FaMapMarkerAlt className='absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400' />
            <button className='btn btn-primary absolute right-0 top-0 h-full px-6'>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className='py-12 bg-gray-100'>
        <div className='container mx-auto'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-6'>Nổi bật</h2>

          {/* Featured Item */}
          <div className='flex space-x-4'>
            {/* Main Image */}
            <div className='flex-1 bg-white shadow-md rounded-lg overflow-hidden'>
              <Image
                src='/images/nail-salon.jpg' // Replace with the main image path
                alt='Nail Art'
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
                  <span className='text-yellow-400 text-lg'>★★★★★</span>
                  <span className='text-gray-600 ml-2'>(100 đánh giá)</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className='space-y-4'>
              <Image
                src='/images/nail-art-1.jpg' // Replace with actual image paths
                alt='Nail Art 1'
                width={150}
                height={100}
                className='w-48 h-32 object-cover rounded-lg'
              />
              <Image
                src='/images/nail-art-2.jpg' // Replace with actual image paths
                alt='Nail Art 2'
                width={150}
                height={100}
                className='w-48 h-32 object-cover rounded-lg'
              />
              <Image
                src='/images/nail-art-3.jpg' // Replace with actual image paths
                alt='Nail Art 3'
                width={150}
                height={100}
                className='w-48 h-32 object-cover rounded-lg'
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
