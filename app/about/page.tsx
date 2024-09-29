const About = () => {
  return (
    <div className='flex flex-col md:flex-row p-8'>
      {/* Brand Section */}
      <div className='bg-secondary w-full md:w-1/2 flex flex-col items-center justify-center p-8 rounded-box shadow-lg'>
        <div className='mb-6'>
          <img src='path_to_your_image' alt='Lovely Glam' className='w-24' />
        </div>
        <h1 className='text-4xl font-bold text-primary mb-2'>Lovely Glam</h1>
        <p className='text-lg'>Effortless beauty, tailored to your schedule.</p>
      </div>

      {/* Story Section */}
      <div className='bg-white w-full md:w-1/2 p-8 rounded-box shadow-lg'>
        <div className='flex items-center justify-center'>
          <h2 className='text-2xl font-bold mb-4 italic'>
            Câu chuyện thương hiệu
          </h2>
        </div>

        <h3 className='text-xl font-semibold text-primary mt-4'>Sứ mệnh:</h3>
        <p className='text-base text-neutral mt-2'>
          &quot;Tạo dựng trải nghiệm làm đẹp tiện lợi và thoải mái tối đa&quot;
          <br />
          Nền tảng cung cấp hệ thống đặt lịch dễ sử dụng cho dịch vụ làm móng,
          nâng cao trải nghiệm khách hàng và hỗ trợ các salon trong quản lý lịch
          hẹn và phát triển kinh doanh.
        </p>

        <h3 className='text-xl font-semibold text-primary mt-6'>Tầm nhìn:</h3>
        <p className='text-base text-neutral mt-2'>
          Trở thành nền tẳng đặt lịch dịch vụ nail hàng đầu TP.HCM, mang lại sự
          tiện ích cho khách hàng và đối tác tin cậy cho các tiệm nail trong khu
          vực. Đồng thời hướng tới việc xây dựng một cộng đồng làm đẹp lành
          mạnh, nơi mọi người có thể dễ dàng tiếp cận và trải nghiệm các dịch vụ
          nail chất lượng cao, mọi lúc, mọi nơi.
        </p>

        <h3 className='text-xl font-semibold text-primary mt-6'>
          Lovely Glam: Nâng tầm trải nghiệm làm nail của bạn
        </h3>
        <p className='text-base text-neutral mt-2'>
          Lovely Glam ra đời với sứ mệnh kết nối khách hàng với những tiệm nail
          chất lượng nhất, mang đến trải nghiệm làm nail hoàn hảo và tiện lợi.
          Chúng tôi là nền tảng đặt lịch hẹn nail trực tuyến uy tín, giúp bạn dễ
          dàng tìm kiếm và đặt lịch hẹ tại các tiệm nail ưng ý trong khu vực của
          bạn.
          <br />
          <br />
          Tại Lovely Glam, bạn sẽ được:
          <br />• Tiết kiệm thời gian: Thay vì phải lân la tìm kiếm và gọi điện
          thoại đặt lịch hẹn từng tiệm nail, bạn chỉ cần truy cập Lovely Glam,
          tìm kiếm tiệm nail theo nhu cầu và đặt lịch hẹn trực tuyến chỉ với vài
          thao tác đơn giản.
          <br />• So sánh giá cả và dịch vụ: Lovely Glam cung cấp đầy đủ thông
          tin về giá cả và dịch vụ của từng tiệm nail, giúp bạn dễ dàng so sánh
          và lựa chọn tiệm nail phù hợp nhất với nhu cầu của mình.
          <br />• Đọc đánh giá của khách hàng: Lovely Glam hiển thị đánh giá của
          khách hàng về từng tiệm nail, giúp bạn có thêm thông tin để đưa ra
          quyết định.
          <br />• Đặt lịch hẹn nhanh chóng: Hệ thống đặt lịch hẹn trực tuyến của
          Lovely Glam hoạt động 24/7, giúp bạn dễ dàng đặt lịch hẹn bất cứ lúc
          nào, bất cứ nơi đâu.
          <br />• Nhận thông báo qua tin nhắn: Lovely Giam sẽ gửi thông báo qua
          tin nhắn để nhắc bạn về lịch hẹn sắp đến, giúp bạn không bỏ lỡ bất kỳ
          lịch hẹn nào.
          <br />
          Lovely Glam không chỉ là nền tảng đặt lịch hẹn nail đơn thuần, mà còn
          là người bạn đồng hành giúp bạn luôn sở hữu những bộ nail đẹp và ấn
          tượng. Với Lovely Glam, bạn có thể dễ dàng tìm kiếm tiệm nail ưng ý,
          tiết kiệm thời gian và tận hưởng trải nghiệm làm nail hoàn hảo nhất.
          <br />
          <br />
          Hãy truy cập Lovely Glam ngay hôm nay để bắt đầu hành trình làm đẹp
          của bạn!
        </p>
      </div>
    </div>
  );
};

export default About;
