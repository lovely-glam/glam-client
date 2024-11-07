import Image from "next/image";

const About = () => {
  return (
    <div className='flex flex-col md:flex-row p-8'>
      {/* Brand Section */}
      <div className='bg-secondary w-full md:w-1/2 flex flex-col items-center justify-center p-8 rounded-box shadow-lg'>
        <div className='mb-6 w-full'>
          <img src="/glam_poster.png" alt="" className="w-full h-auto object-cover" />
        </div>
      </div>


      {/* Story Section */}
      <div className='bg-white w-full md:w-1/2 p-8 rounded-box shadow-lg'>
        <div className='flex items-center justify-center'>
          <h2 className='text-3xl font-bold text-primary mb-4 italic'>
            Câu chuyện thương hiệu
          </h2>
        </div>

        <h3 className='text-xl font-bold text-primary mt-4'>SỨ MỆNH:</h3>
        <p className='text-base text-neutral mt-2'>
          <strong>&quot;Tạo dựng trải nghiệm làm đẹp tiện lợi và thoải mái tối đa&quot;</strong>
          <br />
          Nền tảng cung cấp hệ thống đặt lịch dễ sử dụng cho dịch vụ làm móng,
          nâng cao trải nghiệm khách hàng và hỗ trợ các salon trong quản lý lịch
          hẹn và phát triển kinh doanh.
        </p>

        <h3 className='text-xl font-bold text-primary mt-6'>TẦM NHÌN:</h3>
        <p className='text-base text-neutral mt-2'>
          Trở thành nền tẳng đặt lịch dịch vụ nail hàng đầu TP.HCM, mang lại sự
          tiện ích cho khách hàng và đối tác tin cậy cho các tiệm nail trong khu
          vực. Đồng thời hướng tới việc xây dựng một cộng đồng làm đẹp lành
          mạnh, nơi mọi người có thể dễ dàng tiếp cận và trải nghiệm các dịch vụ
          nail chất lượng cao, mọi lúc, mọi nơi.
        </p>

        <h3 className='text-xl font-bold text-primary mt-6'>
          LOVELY GLAM: NÂNG TẦM TRẢI NGHIỆM LÀM NAIL CỦA BẠN
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
          <br />• <span className="font-bold">Tiết kiệm thời gian:</span> Thay vì phải lân la tìm kiếm và gọi điện
          thoại đặt lịch hẹn từng tiệm nail, bạn chỉ cần truy cập Lovely Glam,
          tìm kiếm tiệm nail theo nhu cầu và đặt lịch hẹn trực tuyến chỉ với vài
          thao tác đơn giản.
          <br />• <span className="font-bold">So sánh giá cả và dịch vụ:</span> Lovely Glam cung cấp đầy đủ thông
          tin về giá cả và dịch vụ của từng tiệm nail, giúp bạn dễ dàng so sánh
          và lựa chọn tiệm nail phù hợp nhất với nhu cầu của mình.
          <br />• <span className="font-bold">Đọc đánh giá của khách hàng:</span> Lovely Glam hiển thị đánh giá của
          khách hàng về từng tiệm nail, giúp bạn có thêm thông tin để đưa ra
          quyết định.
          <br />• <span className="font-bold">Đặt lịch hẹn nhanh chóng:</span> Hệ thống đặt lịch hẹn trực tuyến của
          Lovely Glam hoạt động 24/7, giúp bạn dễ dàng đặt lịch hẹn bất cứ lúc
          nào, bất cứ nơi đâu.
          <br />• <span className="font-bold">Nhận thông báo qua tin nhắn:</span> Lovely Giam sẽ gửi thông báo qua
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
