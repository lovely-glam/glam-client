'use client';
import Calendar from '@/app/_components/payment/Calendar';
import { bookService, pay } from '@/app/_services/bookingService';
import { getCurrentUser } from '@/app/_services/userService';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';

const Payment = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serviceId = searchParams.get('serviceId');
  const serviceName = searchParams.get('serviceName');
  const servicePrice = searchParams.get('servicePrice');

  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeSelection, setShowTimeSelection] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"none" | "success" | "failed">("none");
  const [hoveredStep, setHoveredStep] = useState<null | 'service' | 'time'>(
    null
  );
  const [paymentType, setPaymentType] = useState<'pay-os' | 'vn-pay'>('vn-pay');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState<any>(false);

  useEffect(() => {
    const status = searchParams.get('status') as "success" | "failed";
    if (status === "success") setPaymentStatus("success");
    else if (status === "failed") setPaymentStatus("failed");
  }, [searchParams]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const token = localStorage.getItem('accessToken');

    if (token !== null && token !== undefined) {
      setAuthenticated(true);
      const res = await getCurrentUser();

      if (res.status === 200) {
        setUser(res.data.content);
      }
    }
  };

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

  const handleContinue = () => {
    setShowCalendar(true);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleDateContinue = () => {
    setShowTimeSelection(true);
    setShowCalendar(false);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleTimeContinue = () => {
    if (!selectedDate || !selectedTime) {
      console.error('Date and time must be selected.');
      return;
    }
    setShowTimeSelection(false);
    setShowPayment(true);
  };

  const handlePaymentConfirm = async () => {
    if (!selectedDate || !selectedTime) {
      console.error('Date and time must be selected.');
      return;
    }

    // Format the selected date and time
    const [hours, minutes] = selectedTime.split(/[: ]/);
    const isPM = selectedTime.includes('PM');

    const startTime = new Date(selectedDate);
    startTime.setHours(
      parseInt(hours) + (isPM && parseInt(hours) !== 12 ? 12 : 0) + 7
    );
    startTime.setMinutes(parseInt(minutes));

    const bookingData = {
      nailServiceId: parseInt(serviceId ?? '0', 10),
      makingDay: selectedDate.toISOString(),
      startTime: startTime.toISOString(),
      status: 'BOOKED',
    };

    try {
      const response = await bookService(bookingData);

      if (response.status === 200 && response.data.content) {
        const bookingId = response.data.content.id;

        const payData: {
          bookingId: number; 
          callbackUrl: string;
          type: "PAY_OS"| "VN_PAY"
        } = {
          bookingId: bookingId,
          callbackUrl: `${window.location.origin}/payment`,
          type: paymentType === "pay-os" ? "PAY_OS" : "VN_PAY"
        };
        const payResponse = await pay(payData);

        if (payResponse.status === 200) {
          router.push(payResponse.data.content);
        } else {
          console.error('Payment failed:', payResponse.data);
        }
      } else {
        console.error('Booking failed:', response.data);
      }
    } catch (error) {
      console.error('Error while booking:', error);
    }
  };

  const formattedDate =
    selectedDate &&
    selectedDate.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });

  return (
    <div className='pt-16 flex flex-col items-center justify-center'>
      <div className='w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg border border-gray-300'>
        <div className='w-full bg-base-100 py-4'>
          <div className='flex justify-around items-center text-center bg-secondary py-4 rounded-lg'>
            <div
              className='step'
              onMouseEnter={() => setHoveredStep('service')}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <div
                className={`step-icon ${showCalendar || showTimeSelection || showPayment ||
                    hoveredStep === 'time'
                    ? 'bg-red-400 text-white'
                    : 'bg-gray-200'
                  } rounded-full p-2`}
              >
                <MdOutlineShoppingCart size={27} className='pl-3' />
              </div>
              <span
                className={`step-label ${showCalendar || showTimeSelection || showPayment ||
                    hoveredStep === 'time'
                    ? 'text-red-400'
                    : ''
                  } font-semibold`}
              >
                Dịch vụ
              </span>
            </div>
            <div
              className='step'
              onMouseEnter={() => setHoveredStep('time')}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <div
                className={`step-icon ${showCalendar ||
                    showTimeSelection ||
                    showPayment ||
                    hoveredStep === 'time'
                    ? 'bg-red-400 text-white'
                    : 'bg-gray-200'
                  } rounded-full p-2`}
              >
                📅
              </div>
              <span
                className={`step-label ${showCalendar ||
                    showTimeSelection ||
                    showPayment ||
                    hoveredStep === 'time'
                    ? 'text-red-400'
                    : ''
                  } font-semibold`}
              >
                Thời gian
              </span>
            </div>
            <div className='step'>
              <div
                className={`step-icon ${showPayment ? 'bg-red-400 text-white' : 'bg-gray-200'
                  } rounded-full p-2`}
              >
                💳
              </div>
              <span
                className={`step-label ${showPayment ? 'text-red-400' : ''} font-semibold`}
              >
                Thanh toán
              </span>
            </div>
            <div className='step'>
              <div className='step-icon bg-gray-200 rounded-full p-2'>✔️</div>
              <span className='step-label'>Hoàn tất</span>
            </div>
          </div>
        </div>

        {!showCalendar && !showTimeSelection && !showPayment && paymentStatus === "none" ? (
          <div className='mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-md'>
            <h2 className='text-lg font-bold mb-2'>{serviceName}</h2>
            <p className='text-gray-600'>
              Bao gồm cắt tỉa móng tay hoặc móng chân, dũa móng để tạo hình mong
              muốn.
            </p>
            <div className='text-right mt-4'>
              <span className='text-red-500 text-xl font-bold'>
                {Number(servicePrice).toLocaleString()} VNĐ
              </span>
            </div>
            <div className='flex justify-center mt-8'>
              <button
                className='btn btn-outline btn-primary w-40'
                onClick={handleContinue}
              >
                Tiếp tục
              </button>
            </div>
          </div>
        ) : showCalendar ? (
          <>
            <Calendar onSelectDate={handleDateSelect} />
            <div className='flex justify-center mt-8'>
              <button
                className='btn btn-outline btn-primary w-40'
                onClick={handleDateContinue}
                disabled={!selectedDate}
              >
                Tiếp tục
              </button>
            </div>
          </>
        ) : showTimeSelection ? (
          <>
            <div className='mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-md'>
              <h2 className='text-lg font-bold mb-4'>Chọn giờ</h2>
              <div className='grid grid-cols-3 gap-4'>
                {availableTimes.map((time) => (
                  <div
                    key={time}
                    className={`p-2 rounded-lg border text-center cursor-pointer ${selectedTime === time
                        ? 'bg-red-400 text-white'
                        : 'hover:bg-gray-100'
                      }`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    <span className='block text-lg font-bold'>{time}</span>
                  </div>
                ))}
              </div>
            </div>
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
        ) : paymentStatus === "none" ? (
          <div className='mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-md'>
            <h2 className='text-lg font-bold mb-4'>Thông tin đặt lịch</h2>
            <p>
              <strong>Tên:</strong> {user?.fullName}
            </p>
            <p>
              <strong>Cửa hàng:</strong> {serviceName}
            </p>
            <p>
              <strong>Thời gian:</strong> {selectedTime} {formattedDate}
            </p>
            <p>
              <strong>Tổng cộng:</strong>{' '}
              {Number(servicePrice).toLocaleString()} VND
            </p>
            <hr className='my-4' />
            <p className='text-sm text-gray-600'>
              Phí đặt chỗ của quý khách là 15.000vnđ/1 lượt đặt. Phí đặt chỗ sẽ
              được trừ trực tiếp qua bill khi quý khách thanh toán dịch vụ tại
              cửa hàng.
            </p>
            <div className='mt-4'>
              <label className='flex items-center space-x-2'>
                <input
                  type='radio'
                  name='paymentMethod'
                  value='pay-os'
                  checked={paymentType === 'pay-os'}
                  className='form-radio'
                  onChange={() => setPaymentType('pay-os')}
                />
                <span>Pay OS</span>
              </label>
              <label className='flex items-center space-x-2 mt-2'>
                <input
                  type='radio'
                  name='paymentMethod'
                  value='vn-pay'
                  onChange={() => setPaymentType('vn-pay')}
                  className='form-radio'
                  checked={paymentType === 'vn-pay'}
                />
                <span>VN Pay</span>
              </label>
            </div>
            <hr className='my-4' />
            <div className='flex justify-between'>
              <span className='font-bold'>Tổng</span>
              <span className='font-bold text-red-500'>
                {Number(servicePrice).toLocaleString()} VND
              </span>
            </div>
            <div className='flex justify-center mt-8'>
              <button
                className='btn btn-primary w-40'
                onClick={handlePaymentConfirm}
              >
                Thanh toán
              </button>
            </div>
          </div>
        ) : paymentStatus === "success" ? (
          <div className='mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-md'>
            <h2 className='text-lg font-bold mb-4'>Thành công</h2>
            <p>
              Bạn đã đặt lịch thành công. Cảm ơn vì đã sử dụng dịch vụ của chúng
              tôi.
            </p>
            <button
              className='btn btn-primary w-40 mt-4'
              onClick={() => router.push('/')}
            >
              Trở về trang chủ
            </button>
          </div>
        ) : (
          <div className='mt-6 p-6 bg-red-100 border border-red-400 rounded-lg shadow-md'>
            <h2 className='text-lg font-bold mb-4 text-red-600'>Thất bại</h2>
            <p className='text-red-700'>
              Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.
            </p>
            <button
              className='btn w-40 mt-4 bg-red-500 hover:bg-red-600 text-white'
              onClick={() => router.push('/')}
            >
              Trở về trang chủ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
