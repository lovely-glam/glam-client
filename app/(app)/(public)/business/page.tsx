import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Business = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-8 p-4'>
      <div className='text-4xl text-primary font-bold mt-4'>
        Đăng ký tài khoản
      </div>
      <div className='flex flex-col md:flex-row justify-center items-stretch md:space-x-16 space-y-8 md:space-y-0'>
        <div className='flex flex-col items-center w-full md:w-1/3 space-y-5 text-center'>
          <div className='bg-secondary w-[90%] h-48 rounded-3xl overflow-hidden'>
            <img src="/signin_business.jpg" alt="" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className='font-bold text-lg h-12 flex items-center justify-center'>
            Đăng nhập tài khoản doanh nghiệp
          </div>
          <div className='text-sm text-wrap text-gray-700 h-20'>
            <p className='italic'>
              Đã có tài khoản? Hãy đăng nhập vào tài khoản doanh nghiệp của bạn tại đây.
            </p>
            <p className='italic mt-1'>*Dành cho doanh nghiệp đã đăng ký.</p>
          </div>
          <Link href='/login-business' className='btn btn-primary mt-4'>
            Đăng nhập doanh nghiệp
          </Link>
        </div>

        <div className='flex flex-col items-center w-full md:w-1/3 space-y-5 text-center'>
          <div className='bg-secondary w-[90%] h-48 rounded-3xl overflow-hidden'>
            <img src="/signup_business.jpg" alt="" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className='font-bold text-lg h-12 flex items-center justify-center'>
            Tạo tài khoản doanh nghiệp
          </div>
          <div className='text-sm text-wrap text-gray-700 h-20'>
            <p className='italic'>
              Cửa hàng dễ dàng quản lí lịch hẹn, theo dõi doanh thu và phân tích hiệu quả kinh doanh.
            </p>
            <p className='italic mt-1'>
              Hỗ trợ cửa hàng trong việc thu hút và giữ chân khách hàng.
            </p>
          </div>
          <Link href='/register-business' className='btn btn-primary mt-4'>
            Tạo tài khoản doanh nghiệp
          </Link>
        </div>
      </div>


      <div>
        Bạn đã có tài khoản? Hãy{' '}
        <Link href='/login' className='text-primary'>
          đăng nhập
        </Link>
      </div>
      <div className='w-screen bg-primary text-accent text-center font-bold text-3xl italic p-4'>
        VỀ LOVELY GLAM
      </div>
      <div className='flex'>
        <div className='flex items-center justify-center p-8 px-20'>
          <Image src={'/icon.ico'} alt='' width={500} height={500} />
        </div>
        <div>
          <div className='text-xl'>
            <p className='font-bold'>
              LOVELY GLAM: GIẢI PHÁP QUẢN LÝ HOÀN HẢO CHO TIỆM NAIL CHUYÊN NGHIỆP
            </p>
            <br />
            <p>
              <span className='font-bold'>Lovely Glam</span> không chỉ là nền
              tảng đặt lịch hẹn nail uy tín dành cho khách hàng, mà còn là giải
              pháp quản lý tiệm nail toàn diện, giúp các doanh nghiệp nail nâng
              cao hiệu quả hoạt động và thu hút thêm nhiều khách hàng mới.
            </p>
            <p>
              Với <span className='font-bold'>Lovely Glam</span>, các tiệm nail
              sẽ được:
            </p>
            <ul className='mt-4 space-y-3 list-disc pl-5'>
              <li>
                <strong>Quản lý lịch hẹn hiệu quả</strong>: Hệ thống quản lý lịch hẹn thông minh của Lovely Glam giúp các tiệm nail dễ dàng quản lý lịch hẹn của khách hàng, tránh tình trạng nhầm lẫn hay sót lịch.
              </li>
              <li>
                <strong>Tăng doanh thu</strong>: Lovely Glam giúp các tiệm nail thu hút thêm nhiều khách hàng mới thông qua hệ thống đặt lịch hẹn trực tuyến và các chương trình marketing hiệu quả.
              </li>
              <li>
                <strong>Cải thiện dịch vụ khách hàng</strong>: Lovely Glam cung cấp các công cụ giúp các tiệm nail chăm sóc khách hàng tốt hơn, chẳng hạn như hệ thống lưu trữ thông tin khách hàng, hệ thống gửi tin nhắn nhắc nhở lịch hẹn và hệ thống thu thập phản hồi khách hàng.
              </li>
              <li>
                <strong>Tiết kiệm thời gian và chi phí</strong>: Lovely Glam giúp các tiệm nail tiết kiệm thời gian và chi phí vận hành, nhờ vào hệ thống tự động hóa các quy trình thủ công.
              </li>
            </ul>
            <br />
            <p>
              <span className='font-bold'>Lovely Glam</span> cam kết mang đến
              cho các tiệm nail giải pháp quản lý tiệm nail hoàn hảo nhất, giúp
              các tiệm nail nâng cao hiệu quả hoạt động, thu hút thêm nhiều
              khách hàng mới và gia tăng lợi nhuận.
            </p>
            <br />
            <p>
              Hãy liên hệ với <span className='font-bold'>Lovely Glam</span>{' '}
              ngay hôm nay để được tư vấn miễn phí!
            </p>
          </div>
        </div>
      </div>
      <div className='w-screen bg-primary text-accent text-center font-bold text-3xl italic p-4'>
        GIẢI PHÁP ĐỂ QUẢN LÝ VÀ PHÁT TRIỂN DOANH NGHIỆP CỦA BẠN
      </div>
      <div className='flex w-full justify-evenly p-4'>
        <div className='bg-[#E5E5E5] w-1/4 shadow-xl rounded-3xl p-10'>
          <p className='text-lg font-bold'>Đặt lịch trực tuyến</p>
          <p>
            Dễ dàng tiếp cận, mở rộng tầm nhìn thương hiệu trực tuyến. Tạo hồ sơ tiệm nails của bạn
            trên nền tảng Lovely Glam để thu hút hàng nghìn khách hàng tiềm năng trong khu vực.
          </p>
          <br />
          <p>
            Từ mạng xã hội đến cửa tiệm – thêm nút &quot;Đặt ngay&quot; vào trang Instagram và Facebook,
            cho phép khách hàng mới và hiện tại đặt lịch trực tiếp, tiện lợi hơn bao giờ hết.
            Hợp tác với Lovely Glam giúp tiệm của bạn tiếp cận được nhiều khách hàng,
            tăng khả năng đặt hẹn và xây dựng thương hiệu bền vững.
          </p>
        </div>
        <div className='bg-[#E5E5E5] w-1/4 shadow-xl rounded-3xl p-10'>
          <p className='text-lg font-bold'>Tiếp thị tự động</p>
          <p>
            Nhắm đến nhóm khách hàng mục tiêu với công cụ lọc tối ưu của chúng
            tôi để tiếp cận người chi tiêu nhiều nhất, trung thành nhất, khách
            hàng cũ và nhiều hơn nữa.
          </p>
          <br/>
          <p>
            Gây bất ngờ cho khách hàng vào ngày đặc biệt của họ với ưu đãi, biến
            người mới thành khách hàng thường xuyên và giành lại khách hàng đã
            mất, tất cả đều với chiến dịch thông minh nhắm mục tiêu của chúng
            tôi.
          </p>
        </div>
        <div className='bg-[#E5E5E5] w-1/4 shadow-xl rounded-3xl p-10'>
          <p className='text-lg font-bold'>Xử lí thanh toán</p>
          <p>
            Xử lý thanh toán của khách hàng một cách an toàn thông qua liên kết
            thanh toán qua thẻ Ngân hàng hoặc thanh toán trực tiếp để có trải
            nghiệm thanh toán liền mạch.
          </p>
        </div>
      </div>
      <div className='w-screen bg-primary text-accent text-center font-bold text-3xl italic p-4'>
        NHỮNG GÌ ĐỐI TÁC CHÚNG TÔI NÓI
      </div>
    </div>
  );
};

export default Business;
