import Image from 'next/image';
import React from 'react';

const ShopCard: React.FC<{
  name: string;
  rating: number;
  address: string;
  services: string;
  image: string;
}> = ({ name, rating, address, services, image }) => {
  return (
    <div className='p-4'>
      <div className='card card-side bg-base-100 shadow-2xl border-black border-2 p-8'>
        <div className='flex justify-center items-center w-1/2'>
          <Image src={image} width={200} height={200} alt='Card' />
        </div>
        <div className='card-body'>
          <h2 className='card-title text-primary italic font-bold'>{name}</h2>
          <div className='flex space-x-2 items-center'>
            <div>{rating}</div>
            <Rating value={rating} />
          </div>
          <p className='border-b-2 border-black pb-4'>{address}</p>
          <p className='font-bold'>{services}</p>
        </div>
      </div>
    </div>
  );
};

const Rating: React.FC<{ value: number }> = ({ value }) => {
  // Ensure the value is between 0 and 5
  const normalizedValue = Math.max(0, Math.min(5, value));

  // Round to the nearest half (e.g., 3.9 becomes 4.0, 4.4 becomes 4.5)
  const roundedValue = Math.round(normalizedValue * 2) / 2;

  // Determine how many full stars and half stars to fill
  const fullStars = Math.floor(roundedValue); // Full stars count
  const hasHalfStar = roundedValue % 1 === 0.5; // Whether there's a half star
  const totalStars = 5; // Total stars to display

  return (
    <div className='rating rating-md rating-half'>
      {Array.from({ length: totalStars }).map((_, index) => (
        <React.Fragment key={index}>
          {/* Left half of the star */}
          <input
            type='radio'
            name='rating-10'
            disabled
            className={`mask mask-star-2 mask-half-1 ${
              index < fullStars || (index === fullStars && hasHalfStar)
                ? 'bg-black'
                : 'bg-gray-200'
            }`}
          />
          {/* Right half of the star */}
          <input
            type='radio'
            name='rating-10'
            disabled
            className={`mask mask-star-2 mask-half-2 ${
              index < fullStars ? 'bg-black' : 'bg-gray-200'
            }`}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ShopCard;
