const Payment = () => {
  return (
    <div className='pt-16 flex flex-col items-center justify-center'>
      {/* Main Container */}
      <div className='w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg border border-gray-300'>
        {/* Progress Bar */}
        <div className='w-full bg-base-100 py-4'>
          <div className='flex justify-around items-center text-center bg-secondary py-4 rounded-lg'>
            <div className='step'>
              <div className='step-icon bg-red-400 text-white rounded-full p-2'>
                🛒
              </div>
              <span className='step-label text-red-400 font-semibold'>
                Dịch vụ
              </span>
            </div>
            <div className='step'>
              <div className='step-icon bg-gray-200 rounded-full p-2'>📅</div>
              <span className='step-label'>Thời gian</span>
            </div>
            <div className='step'>
              <div className='step-icon bg-gray-200 rounded-full p-2'>💳</div>
              <span className='step-label'>Thanh toán</span>
            </div>
            <div className='step'>
              <div className='step-icon bg-gray-200 rounded-full p-2'>✔️</div>
              <span className='step-label'>Hoàn tất</span>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className='mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-md'>
          <h2 className='text-lg font-bold mb-2'>Cắt, dũa và định hình móng</h2>
          <p className='text-gray-600'>
            Bao gồm cắt tỉa móng tay hoặc móng chân, dũa móng để tạo hình mong
            muốn.
          </p>
          <div className='text-right mt-4'>
            <span className='text-red-500 text-xl font-bold'>90.000 VNĐ</span>
          </div>
        </div>

        {/* Continue Button */}
        <div className='flex justify-center mt-8'>
          <button className='btn btn-outline btn-primary w-40'>Tiếp tục</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
