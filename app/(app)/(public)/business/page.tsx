import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Business = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-8 p-4'>
      <div className='text-4xl text-primary font-bold mt-4'>
        Đăng ký tài khoản
      </div>
      <div className='flex justify-center space-x-24'>
        <div className='flex flex-col items-center w-1/4 space-y-4'>
          <div className='bg-secondary w-72 h-48 rounded-3xl'></div>
          <div className='font-bold'>Đăng nhập tài khoản doanh nghiệp</div>
          <div>
            <div className='italic'>
              Đã có tài khoản? Hãy đăng nhập vào tài khoản doanh nghiệp của bạn
              tại đây.
            </div>
            <br />
            <div className='italic'>Dành cho doanh nghiệp đã đăng ký.</div>
          </div>
          <Link href='/login-business' className='btn btn-primary'>
            Đăng nhập doanh nghiệp
          </Link>
        </div>
        <div className='flex flex-col items-center w-1/4 space-y-4'>
          <div className='bg-secondary w-72 h-48 rounded-3xl'></div>
          <div className='font-bold'>Tạo tài khoản doanh nghiệp</div>
          <div>
            <div className='italic'>
              Cửa hàng dễ dàng quản lí lịch hẹn, theo dõi doanh thu và phân tích
              hiệu quả kinh doanh.
            </div>
            <div className='italic'>
              Hỗ trợ cửa hàng trong việc thu hút và giữ chân khách hàng.
            </div>
          </div>
          <Link href='/register-business' className='btn btn-primary'>
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
        Về Lovely Glam
      </div>
      <div className='flex'>
        <div className='p-8 px-20'>
          <Image src={'/icon.ico'} alt='' width={400} height={500} />
        </div>
        <div>
          <div className='text-xl'>
            <p className='font-bold'>
              Lovely Glam: Giải pháp quản lý hoàn hảo cho tiệm nail chuyên
              nghiệp
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
            <p>
              Quản lý lịch hẹn hiệu quả: Hệ thống quản lý lịch hẹn thông minh
              của Lovely Glam giúp các tiệm nail dễ dàng quản lý lịch hẹn của
              khách hàng, tránh tình trạng nhầm lẫn hay sót lịch.
            </p>
            <p>
              Tăng doanh thu: Lovely Glam giúp các tiệm nail thu hút thêm nhiều
              khách hàng mới thông qua hệ thống đặt lịch hẹn trực tuyến và các
              chương trình marketing hiệu quả.
            </p>
            <p>
              Cải thiện dịch vụ khách hàng: Lovely Glam cung cấp các công cụ
              giúp các tiệm nail chăm sóc khách hàng tốt hơn, chẳng hạn như hệ
              thống lưu trữ thông tin khách hàng, hệ thống gửi tin nhắn nhắc nhở
              lịch hẹn và hệ thống thu thập phản hồi khách hàng.
            </p>
            <p>
              Tiết kiệm thời gian và chi phí: Lovely Glam giúp các tiệm nail
              tiết kiệm thời gian và chi phí vận hành, nhờ vào hệ thống tự động
              hóa các quy trình thủ công.
            </p>
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
        Giải pháp để quản lý về phát triển doanh nghiệp của bạn
      </div>
      <div className='flex w-full justify-evenly p-4'>
        <div className='bg-[#E5E5E5] w-1/4 shadow-xl rounded-3xl p-10'>
          <p className='text-lg font-bold'>Đặt phòng trực tuyến</p>
          <p>
            Được nhìn thấy, dễ tiếp cận, xây dựng thương hiệu của bạn trực
            tuyến. Tạo hồ sơ trực tuyến trên thị trường của chúng tôi để được
            hàng nghìn khách hàng tiềm năng trong khu vực của bạn chú ý.
          </p>
          <p>
            Từ mạng xã hội đến cửa nhà bạn - thêm nút &quot;Đặt ngay&quot; không
            giới hạn vào trang Instagram và Facebook của bạn để khách hàng mới
            hoặc hiện tại có thể đặt lịch ngay lập tức trực tuyến.
          </p>
        </div>
        <div className='bg-[#E5E5E5] w-1/4 shadow-xl rounded-3xl p-10'>
          <p className='text-lg font-bold'>Tiếp thị tự động</p>
          <p>
            Nhắm đến nhóm khách hàng mục tiêu với công cụ lọc tối ưu của chúng
            tôi để tiếp cận người chi tiêu nhiều nhất, trung thành nhất, khách
            hàng cũ và nhiều hơn nữa.
          </p>
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
            thanh toán Momo, thẻ Ngân hàng hoặc thanh toán trực tiếp để có trải
            nghiệm thanh toán liền mạch.
          </p>
        </div>
      </div>
      <div className='w-screen bg-primary text-accent text-center font-bold text-3xl italic p-4'>
        Những gì đối tác chúng tôi nói
      </div>
    </div>
  );
};

export default Business;
