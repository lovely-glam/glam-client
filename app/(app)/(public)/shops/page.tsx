'use client';
import ShopCard from '@/app/_components/shop/ShopCard';
import { getShops } from '@/app/_services/shopService';
import React, { useEffect, useState } from 'react';

const Shops = () => {
  const [shops, setShops] = useState<any>(null);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const res = await getShops(0);

      if (res.status === 200) {
        setShops(res.data.content.content);
      }
    } catch (error) {}
  };

  return (
    shops && (
      <div className='flex flex-col p-10 px-48 space-y-4'>
        {shops.map((shop: any) => {
          return (
            <ShopCard
              key={shop.id}
              id={shop.id}
              name={shop.name}
              rating={shop.rating}
              address={shop.address}
              services={shop.services}
              image={shop.avatarUrl}
            />
          );
        })}
      </div>
    )
  );
};

export default Shops;
