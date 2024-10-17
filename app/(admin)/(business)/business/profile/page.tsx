'use client';
import { getCurrentShop } from '@/app/_services/businessService';
import React, { useEffect, useState } from 'react';

const BusinessProfile = () => {
  const [shop, setShop] = useState<any>(null);

  useEffect(() => {
    fetchShop();
  }, []);

  const fetchShop = async () => {
    const token = localStorage.getItem('accessToken');

    if (token !== null && token !== undefined) {
      try {
        const res = await getCurrentShop(token);

        if (res.status === 200) {
          setShop(res.data.content);
        }
      } catch (error) {}
    }
  };

  console.log(shop);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default BusinessProfile;
