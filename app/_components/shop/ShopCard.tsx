import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ShopCard: React.FC<{
  id: number;
  name: string;
  rating: number;
  address: string;
  services: {
    id: number;
    name: string;
    description: string;
    basePrice: number;
    duration: number;
  }[];
  image: string;
}> = ({ id, name, rating, address, services, image }) => {
  return (
    <Link href={`/shops/${id}`} className='p-4'>
      <div className='card card-side bg-base-100 shadow-2xl border-black border-2 p-8'>
        <div className='flex justify-center items-center w-1/2'>
          <Image
            className='h-40 w-40 object-contain'
            src={image}
            width={200}
            height={200}
            alt='Card'
          />
        </div>
        <div className='card-body'>
          <h2 className='card-title text-primary italic text-2xl font-bold'>{name}</h2>
          <div className='flex space-x-2 items-center'>
            <div>{rating.toFixed(1)}</div>
            <Rating value={rating} />
          </div>
          <p className='border-b-2 border-black pb-4'>{address}</p>
          <p className="text-lg font-semibold mt-1">Các dịch vụ nổi bật</p>
          <p className='font-bold'>{services && services.length > 0 ? (
            services.slice(0, 2).map((service) => {
              const { name, basePrice, duration } = service;
              const hours = Math.floor(duration / 60);
              const minutes = duration % 60;
              const timeString = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

              return (
                <div key={service.id} className='pt-2 mt-2'>
                  <div className='flex justify-between items-center'>
                    <span className='text-left font-semibold'>{name}</span>
                    <div className='flex flex-col items-end'>
                  <span className='text-right font-bold'>{basePrice}</span>
                  <span className='text-right text-sm'>VND</span>
                </div>
                  </div>
                  <div className='text-left text-sm text-gray-600'>
                    {timeString}
                  </div>
                </div>
              );
            })
          ) : (
            <span>No services available</span>
          )}</p>
        </div>
      </div>
    </Link>
  );
};

export const Rating: React.FC<{ value: number }> = ({ value }) => {
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
            className={`mask mask-star-2 mask-half-1 ${index < fullStars || (index === fullStars && hasHalfStar)
              ? 'bg-black'
              : 'bg-gray-200'
              }`}
          />
          {/* Right half of the star */}
          <input
            type='radio'
            name='rating-10'
            disabled
            className={`mask mask-star-2 mask-half-2 ${index < fullStars ? 'bg-black' : 'bg-gray-200'
              }`}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export const RatingLarge: React.FC<{ value: number }> = ({ value }) => {
  // Ensure the value is between 0 and 5
  const normalizedValue = Math.max(0, Math.min(5, value));

  // Round to the nearest half (e.g., 3.9 becomes 4.0, 4.4 becomes 4.5)
  const roundedValue = Math.round(normalizedValue * 2) / 2;

  // Determine how many full stars and half stars to fill
  const fullStars = Math.floor(roundedValue); // Full stars count
  const hasHalfStar = roundedValue % 1 === 0.5; // Whether there's a half star
  const totalStars = 5; // Total stars to display

  return (
    <div className='rating rating-lg rating-half'>
      {Array.from({ length: totalStars }).map((_, index) => (
        <React.Fragment key={index}>
          {/* Left half of the star */}
          <input
            type='radio'
            name='rating-10'
            disabled
            className={`mask mask-star-2 mask-half-1 ${index < fullStars || (index === fullStars && hasHalfStar)
              ? 'bg-black'
              : 'bg-gray-200'
              }`}
          />
          {/* Right half of the star */}
          <input
            type='radio'
            name='rating-10'
            disabled
            className={`mask mask-star-2 mask-half-2 ${index < fullStars ? 'bg-black' : 'bg-gray-200'
              }`}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ShopCard;
