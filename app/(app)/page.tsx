"use client"
import Image from 'next/image';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ShopCard from '../_components/home/ShopCard';
import Review from '../_components/home/Review';
import Website from '../_components/home/Website';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();
  const handleSearch = () => {
    if (searchQuery.trim()) {
      const query = { address: searchQuery.trim() };

      const params = new URLSearchParams(query).toString();
      router.push(`/shops?q=${params}`);
  }
  };
  return (
    <div className='min-h-screen'>
      <section className='relative bg-pink-100 py-16 h-[35rem] flex items-center justify-center'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute inset-0 filter blur-md'>
            <Image
              src='https://lovely-glam.hcm.ss.bfcplatform.vn/52cbf0b7-fbbf-43e5-955c-23d27f1a36a4-z2zv9dfeuru8tosa1uxm.webp'
              alt='Lovely Glam'
              layout='fill'
              objectFit='cover'
            />
          </div>
        </div>
        <div className='text-center relative w-[33rem]'>
          <div className='relative min-w-lg w-full'>
          <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSubmit={handleSearch}
              placeholder='Search for services or locations'
              className='input input-bordered w-full pl-10 rounded-full'
              aria-label='Search for services or locations'
            />
            <FaMapMarkerAlt className='absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400' />
            <button className='btn h-full absolute right-0 top-0 bg-black text-white rounded-full' onClick={handleSearch}>
              <div className='p-1'>Search</div>
            </button>
          </div>
        </div>
      </section>

      <h2 className='text-3xl font-semibold text-gray-800 mb-6 pt-16 pl-16'>
        Nổi bật
      </h2>

      {/* Sử dụng component ShopCard */}
      <ShopCard />

      {/* Sử dụng component Review */}
      <Review />

      {/* Sử dụng component Website */}
      <Website />
    </div>
  );
}
