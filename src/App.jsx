import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Keyboard, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";

// Thêm thư viện AOS và CSS của nó để tạo hiệu ứng khi cuộn trang
import AOS from 'aos';
import 'aos/dist/aos.css';

// Nhập dữ liệu từ file contentData.js
import {
  bannerImages,
  logoImages,
  bannersPostersStandeesImages,
  cataloguesBrochuresImages,
  packagingDesignImages,
  otherDesignsImages,
  blogArticles
} from "./contentData.js";

// Hàm xử lý cuộn trang mượt
const handleScroll = (e, targetId) => {
  e.preventDefault();
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: "smooth",
    });
  }
};

// Component Modal hiển thị ảnh phóng to với Swiper
function ImageModal({ modalData, onClose }) {
  if (!modalData) return null;

  const { images, initialIndex } = modalData;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300 opacity-100"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl h-[90vh] bg-white p-2 rounded-lg shadow-lg flex justify-center items-center transform transition-transform duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <Swiper
          modules={[Navigation, Keyboard, Pagination]}
          initialSlide={initialIndex}
          navigation
          keyboard={{ enabled: true }}
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={1}
          loop={false}
          className="w-full h-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i} className="flex items-center justify-center">
              <img
                src={img}
                alt={`Phóng to ${i + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-600 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold z-10"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

// Component Slider Dịch vụ đã được cập nhật với hiệu ứng hover
function ServiceSlider({ title, images, id, openModal }) {
  return (
    <section id={id} className="py-12 bg-gray-100" data-aos="fade-up">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-[#ff5733] text-white py-3 px-6 mb-6 rounded-lg text-center font-bold text-2xl uppercase">
          {title}
        </div>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={2} // Mặc định cho di động
          navigation
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div
                className="flex items-center justify-center p-4 bg-white shadow rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => openModal(images, i)}
              >
                <img
                  src={img}
                  alt={`${title} ${i + 1}`}
                  className="w-full h-40 object-contain"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function App() {
  const [modalData, setModalData] = useState(null);

  const openImageModal = (images, initialIndex) => {
    setModalData({ images, initialIndex });
  };

  const closeImageModal = () => {
    setModalData(null);
  };

  // Khởi tạo AOS khi component được render lần đầu
  useEffect(() => {
    AOS.init({
      duration: 1000, // Thời gian hiệu ứng (1000ms = 1s)
      once: true,    // Hiệu ứng chỉ chạy một lần khi cuộn đến
    });
  }, []);

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-[#ff5733] shadow sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <a href="/" className="flex items-center space-x-2">
            <img src="./logos/logogana.png" alt="Logo Gana Design" className="h-10 object-contain" loading="lazy" />
            <span className="font-bold text-xl text-white">Gana Design</span>
          </a>
          <nav className="space-x-2 md:space-x-6 flex items-center">
            <a href="#home" onClick={(e) => handleScroll(e, "home")} className="text-white hover:text-gray-200">
              Trang chủ
            </a>
            <a href="#about" onClick={(e) => handleScroll(e, "about")} className="text-white hover:text-gray-200 hidden md:block">
              Giới thiệu
            </a>

            {/* Dropdown menu cho Dịch vụ đã sửa lỗi */}
            <div className="relative group">
              <span className="text-white hover:text-gray-200 cursor-pointer p-4 -m-4">
                Dịch vụ
              </span>
              <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-md overflow-hidden z-20 hidden group-hover:block transition-all duration-200">
                <a
                  href="#logo-design"
                  onClick={(e) => handleScroll(e, "logo-design")}
                  className="block px-4 py-2 hover:bg-gray-100 text-black"
                >
                  Thiết kế Logo
                </a>
                <a
                  href="#banners-posters"
                  onClick={(e) => handleScroll(e, "banners-posters")}
                  className="block px-4 py-2 hover:bg-gray-100 text-black"
                >
                  Thiết kế Banner, Poster, Standee...
                </a>
                <a
                  href="#catalogues-brochures"
                  onClick={(e) => handleScroll(e, "catalogues-brochures")}
                  className="block px-4 py-2 hover:bg-gray-100 text-black"
                >
                  Thiết kế Catalogue, Brochure, Profile
                </a>
                <a
                  href="#packaging-design"
                  onClick={(e) => handleScroll(e, "packaging-design")}
                  className="block px-4 py-2 hover:bg-gray-100 text-black"
                >
                  Thiết kế Bao bì
                </a>
                <a
                  href="#other-designs"
                  onClick={(e) => handleScroll(e, "other-designs")}
                  className="block px-4 py-2 hover:bg-gray-100 text-black"
                >
                  Các thiết kế khác
                </a>
              </div>
            </div>

            {/* Liên kết Blog đã loại bỏ dropdown */}
            <a href="#blog" onClick={(e) => handleScroll(e, "blog")} className="text-white hover:text-gray-200 hidden md:block">
              Blog
            </a>

            <a href="#register" onClick={(e) => handleScroll(e, "register")} className="text-white hover:text-gray-200">
              Đăng ký
            </a>
          </nav>
        </div>
      </header>

      {/* Trang chủ - Banner đã sửa lỗi responsive */}
      <section id="home" className="relative h-48 sm:h-64 lg:h-96">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          slidesPerView={1}
          className="absolute top-0 left-0 w-full h-full"
        >
          {bannerImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full">
                <img
                  src={img}
                  alt={`Banner thiết kế ấn tượng ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Giới thiệu */}
      <section id="about" className="py-12 max-w-6xl mx-auto px-4" data-aos="fade-up">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-[#ff5733] text-center mb-4 transform transition-all duration-500 hover:scale-105 hover:text-[#e64a19] text-2xl sm:text-3xl lg:text-4xl">
            CHÚNG TÔI KIẾN TẠO GIÁ TRỊ THIẾT KẾ
          </h1>
          <p className="text-xl text-gray-700 text-center max-w-3xl mb-8 text-base sm:text-lg">
            Tại Gana Design, chúng tôi không ngừng sáng tạo để biến ý tưởng của bạn thành những ấn phẩm thiết kế đầy ấn tượng. Chúng tôi tin rằng mỗi chi tiết đều mang một câu chuyện riêng, và nhiệm vụ của chúng tôi là làm cho những câu chuyện ấy trở nên sống động, chuyên nghiệp và có giá trị bền vững.
          </p>
        </div>
      </section>

      {/* Các Slider Dịch vụ đã thêm hiệu ứng */}
      <ServiceSlider
        title="Thiết kế Logo"
        id="logo-design"
        images={logoImages}
        openModal={openImageModal}
      />

      <ServiceSlider
        title="Thiết kế Banner, Poster, Standee..."
        id="banners-posters"
        images={bannersPostersStandeesImages}
        openModal={openImageModal}
      />

      <ServiceSlider
        title="Thiết kế Catalogue, Brochure, Profile Company"
        id="catalogues-brochures"
        images={cataloguesBrochuresImages}
        openModal={openImageModal}
      />

      <ServiceSlider
        title="Thiết kế Bao bì"
        id="packaging-design"
        images={packagingDesignImages}
        openModal={openImageModal}
      />

      <ServiceSlider
        title="Các thiết kế khác"
        id="other-designs"
        images={otherDesignsImages}
        openModal={openImageModal}
      />

      {/* Phần Đăng ký tư vấn và Blog */}
      <section className="py-12 max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Phần Đăng ký tư vấn */}
          <div id="register" className="w-full lg:w-1/2" data-aos="fade-right">
            <div className="bg-[#ff5733] p-8 rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold text-white text-left mb-6">Đăng ký tư vấn</h2>
              <form className="space-y-4" action="https://formspree.io/f/meorjqjg" method="POST">
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-white focus:ring-white p-3 text-black"
                    placeholder="Họ tên của bạn*"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-white focus:ring-white p-3 text-black"
                    placeholder="Số điện thoại*"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-white focus:ring-white p-3 text-black"
                    placeholder="Email*"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-[#ff5733] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Đăng ký tư vấn
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Phần Blog */}
          <div id="blog" className="w-full lg:w-1/2" data-aos="fade-left">
            <h2 className="text-2xl font-bold mb-6">Tin tức & Bài viết</h2>
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              loop
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              slidesPerView={1}
            >
              {blogArticles.map((article, i) => (
                <SwiperSlide key={i}>
                  <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                    <img src={article.image} alt={article.title} className="w-full h-40 object-cover mb-4 rounded-md" loading="lazy" />
                    <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm">{article.summary}</p>
                    <a href="#" className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">
                      Đọc thêm
                    </a>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer id="footer-contact" className="bg-gray-900 text-white py-8 mt-12" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-2">
            Liên hệ: <a href="mailto:hoangnam.natr@gmail.com" className="text-white hover:text-gray-200">
              hoangnam.natr@gmail.com
            </a> | <a href="https://zalo.me/0902979699" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200">
              0902979699  </a>
          </p>
          <p>&copy; {new Date().getFullYear()} Gana. All rights reserved.</p>
        </div>
      </footer>

      {/* Modal hiển thị ảnh phóng to */}
      <ImageModal modalData={modalData} onClose={closeImageModal} />
    </div>
  );
}

export default App;