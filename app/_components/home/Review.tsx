'use client';
import Image from 'next/image';
import { Rating } from '../shop/ShopCard';
import { useEffect, useState } from 'react';
import { getShopFeedbackHome } from '@/app/_services/feedbackService';

const FeedbacksData = [
  {
    id: 1,
    shopId: 1,
    shopName: 'Lisa Nails',
    shopAvatar: '/images/shop1.jpg',
    location: 'Location 1',
    userAvatar: 'https://lovely-glam.hcm.ss.bfcplatform.vn/8deeddcb-a11c-4f65-ae34-6adfdf70e0a1-nailworld.jpg',
    rating: 5,
    reviewNumber: 1,
    customerName: 'Ly',
    joinDate: '2022-01-01',
    service: 'Service',
    feedback:
      'Tôi đã trải nghiệm thử trang web và thấy ổn, sẽ quay lại web vào lần sau.',
  },
  {
    id: 2,
    shopId: 2,
    shopName: 'Lisa Nails',
    shopAvatar: '/images/shop2.jpg',
    location: 'Location 2',
    userAvatar: 'https://lovely-glam.hcm.ss.bfcplatform.vn/126fe9b7-837a-418f-a92a-566b1c09292d-mimynail.png',
    rating: 5,
    reviewNumber: 2,
    customerName: 'Mai',
    joinDate: '2022-02-02',
    service: 'Service',
    feedback: 'Web mới ra mắt nhưng khá tiện lợi, tìm được tiệm nails gần nhà',
  },
];

export type FeedbackResponse = {
  id: number;
  shopId: number;
  shopName: string;
  shopAvatar: string;
  location: string;
  userAvatar: string;
  rating: number;
  reviewNumber: number;
  customerName: string;
  joinDate: string;
  service: string;
  feedback: string;
};
const Review = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackResponse[]>([]);
  const fetchFeedbackHome = async (): Promise<
    FeedbackResponse[] | undefined
  > => {
    const result = await getShopFeedbackHome();
    if (result.status === 200) {
      return result.data.content;
    }
  };
  useEffect(() => {
    const fetch = async () => {
      const result = await fetchFeedbackHome();
      if (result) {
        setFeedbacks(result);
      }
    };
    fetch();
  }, []);
  return (
    <section className='p-6 bg-gray-50'>
      <div className='min-w-max mx-auto pl-16 pr-16'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6'>
          ĐÁNH GIÁ DỊCH VỤ
        </h2>
        <div className='w-full flex space-x-10'>
          {FeedbacksData.length > 0 ? (
            FeedbacksData.map((item) => (
              <ReviewCard
                key={item.id}
                userAvatar={item.userAvatar}
                fullName={item.customerName}
                rating={item.rating}
                service={item.service}
                comment={item.feedback}
                shopAvatar={item.shopAvatar}
                shopName={item.shopName}
                shopLocation={item.location}
              />
            ))
          ) : (
            <div className='bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md'>
              <p className='font-semibold'>No feedback available.</p>
              <p className='text-sm'>Be the first to leave a review!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const ReviewCard: React.FC<{
  userAvatar: string;
  fullName: string;
  rating: number;
  service: string;
  comment: string;
  shopAvatar: string;
  shopName: string;
  shopLocation: string;
}> = ({
  userAvatar,
  fullName,
  rating,
  service,
  comment,
  shopAvatar,
  shopName,
  shopLocation,
}) => {
  return (
    <div className='p-6 bg-white shadow-lg rounded-lg flex justify-between items-center w-[70%]'>
      {/* Left side: User Section */}
      <div className='flex items-center space-x-4'>
        {/* User Avatar */}
        <Image
          src={userAvatar}
          alt='User Avatar'
          width={60}
          height={60}
          className='rounded-full border-2 border-gray-300'
        />
        <div>
          <h3 className='text-lg font-semibold text-gray-800'>{fullName}</h3>
          <div className='flex items-center text-sm text-gray-600'>
            <Rating value={rating} />
            <span className='ml-2'>{rating} Stars</span>
          </div>
          <p className='mt-2 text-gray-700 text-sm'>{comment}</p>
          {/* <p className='text-xs text-gray-500 mt-1'>Service: {service}</p> */}
        </div>
      </div>
      {/* <div className='flex items-center space-x-4 bg-gray-100 p-4 rounded-lg border border-gray-300'>
        <Image
          src={shopAvatar}
          alt='Shop Avatar'
          width={50}
          height={50}
          className='rounded-full border-2 border-pink-400'
        />
        <div>
          <h4 className='text-md font-bold text-pink-600'>
            {'Sunshine Nails'}
          </h4>
          <p className='text-sm text-gray-600'>Location: {shopLocation}</p>
        </div>
      </div> */}
    </div>
  );
};

export default Review;
