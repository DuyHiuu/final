import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Input, Spin } from "antd";
import useFetchRooms from "../../api/useFetchRooms";
import useFetchServices from "../../api/useFetchServices";
import useFetchBlogs from "../../api/useFetchBlogs";
import useFetchComments from "../../api/useFetchComments";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay"; 
import { Autoplay, Pagination } from "swiper/modules";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClickDanhsachphong = () => {
    navigate("/danhsach");
  };

  const handleClickDocthem = () => {
    navigate("/blog");
  };

  const cards = [
    {
      title: "Thời gian linh hoạt",
      description: "Nhận trông thú mọi lúc và tối đa trong 1 tháng",
      icon: (
        <svg
          className="h-8 w-8 text-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Đầy đủ đồ dùng",
      description: "Các đồ dùng cần thiết của các bé đều được trang bị đầy đủ",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9h18M3 15h18M3 12h18M4 6h16M4 18h16"
          />
        </svg>
      ),
    },
    {
      title: "Camera theo dõi",
      description: "Theo dõi thú cưng 24/24",
      icon: (
        <svg
          className="h-8 w-8 text-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      ),
    },
    {
      title: "Hỗ trợ 24/7",
      description: "Liên hệ fanpage",
      icon: (
        <svg
          className="h-8 w-8 text-500"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
          <line x1="12" y1="12" x2="12" y2="12.01" />
          <line x1="8" y1="12" x2="8" y2="12.01" />
          <line x1="16" y1="12" x2="16" y2="12.01" />
        </svg>
      ),
    },
  ];

  const khuonItems = [
    {
      title: "Tắm",
      description: "Sử dụng các sản phẩm 100% được kiểm định về an toàn cho các bé",
      imageUrl: "/images/anh1.webp",
    },
    {
      title: "Tỉa lông",
      description: "Chuyên nghiệp - Gọn gàng - Đẹp mắt",
      imageUrl: "/images/anh2.webp",
    },
    {
      title: "Tiêm vắc xin",
      description: "Mô tả chĐược các bác sĩ thú y tư vấn và trực tiếp tiêm cho các béo khuôn 3",
      imageUrl: "/images/anh3.webp",
    },
  ];

  const { room } = useFetchRooms();
  const { service } = useFetchServices();
  const { blog } = useFetchBlogs();

  const ReviewsSection = () => {
    const { comments, loading, error } = useFetchComments();

    return (
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mt-10">Đánh giá</h1>
        <p className="text-lg text-center mt-2">Một số đánh giá tiêu biểu</p>
        <div className="flex flex-wrap justify-center mt-6">
          {loading && <Spin />}
          {error && <p>Error: {error}</p>}
          {comments.slice(0, 3).map((comment, index) => (
            <Card
              key={index}
              title={comment.content}
              bordered={false}
              style={{ width: 350, marginBottom: 16 }}
              className="bg-[#F2F0F2] text-center"
            >
              <p className="text-sm">Mô tả thêm về dịch vụ này.</p>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const bannerImages = [
    "/images/img.webp",
    "/images/banner2.jpg",
    "/images/banner5.jpg",
  ];

  return (
    <div className="flex flex-col items-center mb-20 mt-24">
      {/* Banner Image */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="w-full max-h-[600px]"
      >
        {bannerImages.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <img
              className="w-full h-auto object-cover max-h-[600px]"
              src={imageUrl}
              alt={`Slide ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Search Input */}
      <div className="flex justify-center mt-10">
        <div className="relative w-full max-w-md">
          <Input
            placeholder="Tìm kiếm..."
            prefix={
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M21 21l-4.35-4.35M18.5 10.5A7.5 7.5 0 1111 3a7.5 7.5 0 017.5 7.5z" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Content */}
      <h1 className="text-3xl font-bold mt-4 text-center">
        PetSpa xin chào bạn
      </h1>
      <p className="text-lg text-center mt-2">
        Ở đây chúng tôi có các dịch vụ chăm sóc và trông giữ chó mèo hàng đầu.
      </p>
      <p>Liên hệ hotline: 0868403204</p>

      {/* Cards Section */}
      <Row gutter={[16, 16]} justify="center" className="mt-10">
        {cards.map((card, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card className="bg-[#E2F1E8]" hoverable>
              <div className="mb-2">{card.icon}</div>
              <h1 className="font-bold text-xl">{card.title}</h1>
              <p>{card.description}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Services Section */}
      <h2 className="text-2xl font-semibold mt-12">Dịch Vụ</h2>
      <Row gutter={[16, 16]} justify="center" className="mt-6">
        {khuonItems.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              cover={<img alt={item.title} src={item.imageUrl} />}
              hoverable
            >
              <Card.Meta title={item.title} description={item.description} />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Rooms & Blogs */}
      <div className="mt-12 w-full text-center">
        <Button type="primary" onClick={handleClickDanhsachphong} className="mr-4">
          Xem danh sách phòng
        </Button>
        <Button type="default" onClick={handleClickDocthem}>
          Đọc thêm
        </Button>
      </div>

      <ReviewsSection />
    </div>
  );
};

export default HomePage;
