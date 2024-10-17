'use client';
import Calendar from '@/app/_components/payment/Calendar';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';

const Payment = () => {
  const searchParams = useSearchParams();

  // Extract query parameters
  const serviceId = searchParams.get('serviceId');
  const serviceName = searchParams.get('serviceName');
  const servicePrice = searchParams.get('servicePrice');

  // State to control whether the user is on the service details or the calendar page
  const [showCalendar, setShowCalendar] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<null | 'service' | 'time'>(
    null
  ); // Handle hover

  if (!serviceId || !serviceName || !servicePrice) {
    return <div>Loading...</div>;
  }

  const handleContinue = () => {
    // Switch to the calendar view
    setShowCalendar(true);
  };

  return (
    <div className='pt-16 flex flex-col items-center justify-center'>
      {/* Main Container */}
      <div className='w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg border border-gray-300'>
        {/* Progress Bar */}
        <div className='w-full bg-base-100 py-4'>
          <div className='flex justify-around items-center text-center bg-secondary py-4 rounded-lg'>
            {/* Dịch vụ Step */}
            <div
              className='step'
              onMouseEnter={() => setHoveredStep('service')}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <div
                className={`step-icon ${
                  !showCalendar || hoveredStep === 'time'
                    ? 'bg-red-400 text-white'
                    : 'bg-gray-200'
                } rounded-full p-2`}
              >
                <MdOutlineShoppingCart size={27} className='pl-3' />
              </div>
              <span
                className={`step-label ${
                  !showCalendar || hoveredStep === 'time' ? 'text-red-400' : ''
                } font-semibold`}
              >
                Dịch vụ
              </span>
            </div>

            {/* Thời gian Step */}
            <div
              className='step'
              onMouseEnter={() => setHoveredStep('time')}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <div
                className={`step-icon ${
                  showCalendar || hoveredStep === 'time'
                    ? 'bg-red-400 text-white'
                    : 'bg-gray-200'
                } rounded-full p-2`}
              >
                📅
              </div>
              <span
                className={`step-label ${
                  showCalendar || hoveredStep === 'time' ? 'text-red-400' : ''
                }`}
              >
                Thời gian
              </span>
            </div>

            {/* Thanh toán Step */}
            <div className='step'>
              <div className='step-icon bg-gray-200 rounded-full p-2'>💳</div>
              <span className='step-label'>Thanh toán</span>
            </div>

            {/* Hoàn tất Step */}
            <div className='step'>
              <div className='step-icon bg-gray-200 rounded-full p-2'>✔️</div>
              <span className='step-label'>Hoàn tất</span>
            </div>
          </div>
        </div>

        {/* Conditional Rendering for Service Details or Calendar */}
        {!showCalendar ? (
          <>
            {/* Service Details */}
            <div className='mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-md'>
              <h2 className='text-lg font-bold mb-2'>{serviceName}</h2>
              <p className='text-gray-600'>
                Bao gồm cắt tỉa móng tay hoặc móng chân, dũa móng để tạo hình
                mong muốn.
              </p>
              <div className='text-right mt-4'>
                <span className='text-red-500 text-xl font-bold'>
                  {Number(servicePrice).toLocaleString()} VNĐ
                </span>
              </div>
            </div>

            {/* Continue Button */}
            <div className='flex justify-center mt-8'>
              <button
                className='btn btn-outline btn-primary w-40'
                onClick={handleContinue} // Switch to the calendar
              >
                Tiếp tục
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Calendar Component */}
            <Calendar />

            {/* Continue Button After Selecting Date */}
            <div className='flex justify-center mt-8'>
              <button className='btn btn-outline btn-primary w-40'>
                Thanh toán
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
