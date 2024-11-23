import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Input, Spin, Avatar, Modal, Divider } from "antd";
import useFetchRooms from "../../api/useFetchRooms";
import useFetchServices from "../../api/useFetchServices";
import useFetchBlogs from "../../api/useFetchBlogs";
import useFetchComments from "../../api/useFetchComments";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";

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

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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

  const { room } = useFetchRooms();
  const { service } = useFetchServices();
  const { blog } = useFetchBlogs();

  const ReviewsSection = () => {
    const { comments, loading, error } = useFetchComments();
    console.log(comments);

    return (
      <div className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Đánh giá từ khách hàng
        </h2>
        <p className="text-center text-gray-500 mt-2 mb-8">
          Khách hàng của chúng tôi nói gì về dịch vụ PetHouse?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {loading}
          {error && <p>Error: {error}</p>}
          {comments?.slice(0, 3).map((comment) => (
            <div
              key={comment?.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              data-aos="fade-up"
            >
              <div className="flex items-start mb-4">
                <Avatar className="me-3 bg-[#064749]">{comment?.user?.name[0]}</Avatar>
                <div className="flex flex-col">
                  <h4 className="text-lg font-semibold">{comment?.user?.name}</h4>
                  <p className="text-sm text-gray-600">{comment?.content}</p>
                </div>
              </div>
            </div>
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const showModal = (service) => {
    setCurrentService(service);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentService(null);
  };

  return (
    <div className="flex flex-col items-center mb-20 mt-24">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        effect="coverflow" // Thêm hiệu ứng coverflow
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
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


      <h1 className="text-3xl font-bold mt-12 text-center">
        PetSpa xin chào bạn
      </h1>
      <p className="text-lg text-center mt-2">
        Ở đây chúng tôi có các dịch vụ chăm sóc và trông giữ chó mèo hàng đầu.
      </p>
      <p>Liên hệ hotline: 0868403204</p>

      <Row gutter={[16, 16]} justify="center" className="mt-10">
        {cards.map((card, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              className="bg-[#E2F1E8] hover:shadow-lg transition-transform transform hover:scale-105"
              style={{
                height: "170px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              data-aos="fade-up"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "8px",
                  width: "100%",
                }}
              >
                {card.icon}
              </div>
              <h1
                style={{
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  textAlign: "center",
                }}
              >
                {card.title}
              </h1>
              <p style={{ textAlign: "center" }}>{card.description}</p>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="text-2xl font-semibold mt-12">
        Một số hình ảnh của PetHouse
      </h2>
      <Row gutter={[16, 16]} justify="center" className="mt-6" data-aos="fade-up">
        {room?.slice(0, 5).map((item: any) => (
          <Col key={item.id} xs={24} sm={6} md={4} lg={4} className="flex justify-center">
            <img
              alt={item.size_name}
              src={item.img_thumbnail}
              style={{
                height: "300px",
                width: "300px",
                objectFit: "cover",
                borderRadius: "12px",
                margin: "0 8px",
              }}
            />
          </Col>
        ))}
      </Row>

      <div className="mt-12 w-full text-center">
        <Button
          type="primary"
          onClick={handleClickDanhsachphong}
          className="mr-4 bg-[#064749]"
        >
          Xem danh sách phòng
        </Button>
      </div>

      <h2 className="mt-12 text-2xl font-semibold">Các dịch vụ chăm sóc</h2>
      <p className="text-center mt-4">Các dịch vụ thực hiện bởi các nhân viên được đào tạo bài bản, có chứng chỉ hành nghề.</p>

      <Row gutter={[16, 16]} justify="center" className="mt-6 mb-20" data-aos="fade-up">
        {service?.slice(0, 3).map((service) => (
          <Col key={service.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img
                  alt={service.name}
                  src={service.image}
                  style={{
                    height: "350px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              }
              style={{
                height: "350px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Card.Meta
                title={service.name}
              />
              <Button
                type="link"
                onClick={() => showModal(service)}
                className="text-sm text-[#064749] mt-2"
              >
                Xem chi tiết
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={currentService?.name}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <div>
          <img
            alt={currentService?.name}
            src={currentService?.image}
            style={{
              width: "150px",
              height: "auto",
              objectFit: "contain",
              marginBottom: "16px",
            }}
          />
          <p>{currentService?.description}</p>
        </div>
      </Modal>

      <h2 className="text-2xl font-semibold mt-12">Blog</h2>
      <Row gutter={[16, 16]} justify="center" align="stretch" className="mt-6">
        {blog?.slice(0, 3).map((item: any) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img
                  alt={item.title}
                  src={item.image}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                  data-aos="fade-up"
                />
              }
              style={{
                height: "450px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Card.Meta
                title={item.title}
                description={item.description}
                style={{
                  textAlign: "center",
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-12 w-full text-center">
        <Button
          type="primary"
          onClick={handleClickDocthem}
          className="bg-[#064749]"
        >
          Đọc thêm
        </Button>
      </div>

      <ReviewsSection />
    </div>
  );
};

export default HomePage;
