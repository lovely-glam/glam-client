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

  // State to control the view stages (service details, calendar, or time selection)
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeSelection, setShowTimeSelection] = useState(false); // Time selection step
  const [hoveredStep, setHoveredStep] = useState<null | 'service' | 'time'>(
    null
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null); // Track the selected time

  // Predefined list of times (as per the image)
  const availableTimes = [
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
    '09:00 PM',
  ];

  if (!serviceId || !serviceName || !servicePrice) {
    return <div>Loading...</div>;
  }

  const handleContinue = () => {
    // Switch to the calendar view
    setShowCalendar(true);
  };

  const handleDateContinue = () => {
    // Switch to the time selection view after the date is selected
    setShowTimeSelection(true);
    setShowCalendar(false);
  };

  const handleTimeSelect = (time: string) => {
    // Set the selected time
    setSelectedTime(time);
  };

  const handleTimeContinue = () => {
    // Proceed with the selected time (e.g., move to payment)
    console.log('Selected Time:', selectedTime);
    // Navigate to the payment or next step here
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
                  (!showCalendar && !showTimeSelection) ||
                  hoveredStep === 'time'
                    ? 'bg-red-400 text-white'
                    : 'bg-gray-200'
                } rounded-full p-2`}
              >
                <MdOutlineShoppingCart size={27} className='pl-3' />
              </div>
              <span
                className={`step-label ${
                  (!showCalendar && !showTimeSelection) ||
                  hoveredStep === 'time'
                    ? 'text-red-400'
                    : ''
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
                  showCalendar || showTimeSelection || hoveredStep === 'time'
                    ? 'bg-red-400 text-white'
                    : 'bg-gray-200'
                } rounded-full p-2`}
              >
                📅
              </div>
              <span
                className={`step-label ${
                  showCalendar || showTimeSelection || hoveredStep === 'time'
                    ? 'text-red-400'
                    : ''
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

        {/* Conditional Rendering for Service Details, Calendar, or Time Selection */}
        {!showCalendar && !showTimeSelection ? (
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
                onClick={handleContinue}
              >
                Tiếp tục
              </button>
            </div>
          </>
        ) : showCalendar ? (
          <>
            {/* Calendar Component */}
            <Calendar />

            {/* Continue Button After Selecting Date */}
            <div className='flex justify-center mt-8'>
              <button
                className='btn btn-outline btn-primary w-40'
                onClick={handleDateContinue}
              >
                Tiếp tục
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Time Selection Component */}
            <div className='mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-md'>
              <h2 className='text-lg font-bold mb-4'>Chọn giờ</h2>
              <div className='grid grid-cols-3 gap-4'>
                {availableTimes.map((time) => (
                  <div
                    key={time}
                    className={`p-2 rounded-lg border text-center cursor-pointer ${
                      selectedTime === time
                        ? 'bg-red-400 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    <span className='block text-lg font-bold'>{time}</span>
                    <span className='block text-sm text-gray-600'>pm</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Button After Selecting Time */}
            <div className='flex justify-center mt-8'>
              <button
                className='btn btn-outline btn-primary w-40'
                onClick={handleTimeContinue}
                disabled={!selectedTime}
              >
                Tiếp tục
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
