"use client"
import Image from 'next/image';
import { Rating } from '../shop/ShopCard';

import { getShopsOutstanding } from '@/app/_services/shopService'
import { useEffect, useState } from 'react';

export type ShopHomeInfo = {
  id: number;
  name: string;
  rating: number;
  feedbackNumber: number;
  address: string;
  thumbs: string[]
}

const ShopCard = () => {
  const [shopHomeInfoList, setShopHomeInfoList] = useState<ShopHomeInfo[]>([]);
  const fetchShopCard = async (): Promise<ShopHomeInfo[]> => {
    try {
      const shopHomeList = await getShopsOutstanding();
      if (shopHomeList.status === 200) {
        return shopHomeList.data.content;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching shop cards:", error);
      return [];
    }
  };
  useEffect(() => {
    const loadShopCards = async () => {
      const shops = await fetchShopCard();
      setShopHomeInfoList(shops);
    };
    loadShopCards();
  }, []);
  return (
    <section className='p-12 bg-primary'>
      <div className='px-20'>
        {shopHomeInfoList.map((shop) => (
          <div key={shop.id} className='flex space-x-4 mb-6'>
            <div className='flex-1 bg-white shadow-md rounded-lg overflow-hidden'>
              <Image
                src={shop.thumbs && shop.thumbs.length > 0 ? shop.thumbs[0] : '/default-image.jpg'}
                alt='Nail Salon'
                width={600}
                height={400}
                className='w-full h-64 object-cover'
              />
              <div className='p-4'>
                <h3 className='text-xl font-bold'>{shop.name}</h3>
                <p className='text-gray-500'>{shop.address}</p>
                <div className='flex items-center mt-2'>
                  <Rating value={shop.rating} />
                  <span className='text-gray-600 ml-2'>({shop.feedbackNumber} đánh giá)</span>
                </div>
              </div>
            </div>
            <div className='space-y-4'>
              {shop.thumbs && shop.thumbs.length > 1 && shop.thumbs.slice(1).map((thumb, index) => (
                <Image
                  key={index}
                  src={thumb}
                  alt={`Nail Art ${index + 1}`}
                  width={150}
                  height={100}
                  className='w-48 h-32 object-cover rounded-lg'
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopCard;
