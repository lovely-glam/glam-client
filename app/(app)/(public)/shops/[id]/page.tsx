"use client"
import ChatWindow from '@/app/_components/chat/ChatWindow';
import { RatingLarge } from '@/app/_components/shop/ShopCard';
import { getShop } from '@/app/_services/shopService'; // Assuming this fetches shop details.
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ShopDetail = () => {
  const [shop, setShop] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      fetchShop(Number(id));
      // fetchReviews(Number(id)); // Fetch reviews when shop ID is available.
    }
  }, [id]);

  const fetchShop = async (id: number) => {
    try {
      const res = await getShop(id);
      if (res.status === 200) {
        setShop(res.data.content);
      }
    } catch (error) {
      console.error('Failed to fetch shop', error);
    }
  };

  // const fetchReviews = async (id: number) => {
  //   try {
  //     const reviewData = await getReviews(id); // Simulated API call
  //     setReviews(reviewData);
  //   } catch (error) {
  //     console.error('Failed to fetch reviews', error);
  //   }
  // };

  if (!shop) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-10 flex flex-col space-y-6 px-40'>
      {/* Shop Header */}
      <div className='flex flex-col justify-center items-center space-y-4'>
        <h1 className='font-bold text-5xl'>{shop.name}</h1>
        <p className='text-lg'>{shop.address}</p>
        <div className='flex space-x-4'>
          <img
            src={shop.avatarUrl}
            alt={shop.name}
            className='w-60 h-60 object-cover'
          />
          <div className='grid grid-cols-3 gap-4'>
            {shop.thumbnails.map((thumb: string, index: number) => (
              <img
                key={index}
                src={thumb}
                alt={`thumbnail-${index}`}
                className='w-full h-32 object-cover'
              />
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className='font-bold text-2xl italic mb-4'>Dịch vụ</div>
      <div className='flex flex-col space-y-4'>
        {shop.nailServices.map((service: any) => (
          <div
            key={service.id}
            className='flex justify-between items-center border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-200'
          >
            <div>
              <h3 className='font-semibold text-lg'>{service.name}</h3>
              <p className='text-gray-600'>{service.duration} phút</p>
              <p className='font-bold text-gray-800'>
                {service.basePrice.toLocaleString()} VND
              </p>
            </div>
            <button className='bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600'>
              Book
            </button>
          </div>
        ))}
      </div>

      {/* Rating and Reviews */}
      <div className='space-y-2'>
        <p className='font-bold text-2xl italic'>Đánh giá</p>
        <RatingLarge value={shop.vote} />
        <p>
          {shop.vote} <span className='text-info'>(96)</span>
        </p>

        {/* Reviews Grid */}
        <div className='grid grid-cols-3 gap-6'>
          {reviews.map((review, index) => (
            <div key={index} className='border p-4 rounded-lg space-y-2'>
              <div className='flex items-center space-x-2'>
                <div className='w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold'>
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className='font-semibold'>{review.name}</p>
                  <p className='text-xs text-gray-500'>{review.date}</p>
                </div>
              </div>
              <div className='flex items-center space-x-1'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`fa fa-star ${
                      i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
      <ChatWindow shopProfileId={Number(id)}/>
    </div>
  );
};

export default ShopDetail;
