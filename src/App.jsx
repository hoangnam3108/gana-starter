import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Keyboard } from "swiper/modules"; 
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import {
  bannerImages,
  logoImages,
  bannersPostersStandeesImages,
  cataloguesBrochuresImages,
  packagingDesignImages,
  otherDesignsImages,
  blogArticles
} from "./contentData.js";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] } 
  }
};

function SmartImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-50">
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 animate-shimmer" 
             style={{ backgroundSize: '200% 100%' }}></div>
      )}
      <img
        src={src}
        alt={alt || "Thiết kế đồ họa chuyên nghiệp - Gana Design"}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        className={`${className} transition-all duration-1000 ${loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-md'}`}
      />
    </div>
  );
}

function ImageModal({ modalData, onClose }) {
  if (!modalData) return null;
  const { images, initialIndex } = modalData;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/98 flex items-center justify-center z-[100] p-4 backdrop-blur-md" 
      onClick={onClose}
    >
      <div className="relative w-full max-w-5xl h-[85vh] flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
        <Swiper modules={[Navigation, Keyboard]} initialSlide={initialIndex} navigation keyboard={{ enabled: true }} spaceBetween={10} slidesPerView={1} className="w-full h-full">
          {images.map((img, i) => (
            <SwiperSlide key={i} className="flex items-center justify-center">
              <img src={img} alt="Full View Portfolio" className="max-w-full max-h-full object-contain" />
            </SwiperSlide>
          ))}
        </Swiper>
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-[#ff5733] text-5xl transition-colors">✕</button>
      </div>
    </motion.div>
  );
}

function ServiceSlider({ title, description, images, id, openModal, lightBg = true }) {
  return (
    <motion.section 
      id={id} 
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`py-28 ${lightBg ? 'bg-white' : 'bg-[#fafafa]'}`}
    >
      <div className="max-w-6xl mx-auto px-4"> 
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">{title}</h2>
          <div className="h-1.5 w-20 bg-[#ff5733] rounded-full mb-6"></div>
          <p className="max-w-2xl text-gray-500 font-medium leading-relaxed">{description}</p>
        </div>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          navigation
          autoplay={{ delay: 4000 }}
          breakpoints={{ 640: { slidesPerView: 3 }, 1024: { slidesPerView: 4, spaceBetween: 30 } }}
          className="pb-12 px-2"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <motion.div 
                whileHover={{ y: -15 }}
                className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
                onClick={() => openModal(images, i)}
              >
                <div className="aspect-[3/4] p-5">
                  <SmartImage src={img} alt={`${title} Gana Design mẫu ${i+1}`} className="w-full h-full object-contain group-hover:scale-110 duration-700" />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#ff5733] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
}

function App() {
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    document.body.style.overflow = modalData ? 'hidden' : 'unset';
  }, [modalData]);

  return (
    <div className="font-sans text-gray-900 selection:bg-[#ff5733] selection:text-white overflow-x-hidden antialiased">
      {/* SEO: Thẻ H1 ẩn cho từ khóa chính */}
      <h1 className="sr-only">Gana Design - Dịch vụ thiết kế Logo và Bộ nhận diện thương hiệu chuyên nghiệp</h1>

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4 md:px-8">
          <a href="#home" className="flex items-center group" aria-label="Gana Design Home">
            <img src="/favicon.png" alt="Gana Design" className="h-10 w-auto" />
            <span className="ml-3 font-black text-2xl tracking-tighter text-gray-900 uppercase">Gana Design</span>
          </a>
          <nav className="hidden md:flex items-center space-x-10 font-bold text-xs uppercase tracking-widest text-gray-500">
            <a href="#home" className="hover:text-[#ff5733] transition-colors">Trang chủ</a>
            <a href="#logo-design" className="hover:text-[#ff5733] transition-colors">Dịch vụ</a>
            <a href="#blog" className="hover:text-[#ff5733] transition-colors">Kiến thức</a>
            <a href="#register" className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-[#ff5733] transition-all transform hover:-translate-y-1 shadow-md">Liên hệ ngay</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative h-[70vh] md:h-[85vh] overflow-hidden bg-black pt-20">
        <Swiper modules={[Autoplay, Navigation]} navigation autoplay={{ delay: 7000 }} loop className="h-full w-full">
          {bannerImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full">
                <SmartImage src={img} alt="Portfolio Banner Gana Design" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Stats */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Dự án đã thực hiện", value: "1000+" },
            { label: "Khách hàng tin chọn", value: "500+" },
            { label: "Năm trong nghề", value: "10+" },
            { label: "Đánh giá hài lòng", value: "99%" }
          ].map((stat, i) => (
            <div key={i} className="group">
              <div className="text-5xl font-black text-[#ff5733] mb-2 tracking-tighter group-hover:scale-110 transition-transform duration-500">{stat.value}</div>
              <div className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Sliders with SEO Content */}
      <ServiceSlider 
        title="Thiết kế Logo" 
        id="logo-design" 
        description="Chúng tôi sáng tạo những biểu tượng độc bản, giúp thương hiệu của bạn khắc sâu vào tâm trí khách hàng ngay từ cái nhìn đầu tiên."
        images={logoImages} 
        openModal={(imgs, idx) => setModalData({images: imgs, initialIndex: idx})} 
        lightBg={true} 
      />
      <ServiceSlider 
        title="Banner & Poster" 
        id="banners-posters" 
        description="Giải pháp thiết kế quảng cáo chuyên nghiệp trên đa nền tảng, từ digital đến ấn phẩm in ấn khổ lớn."
        images={bannersPostersStandeesImages} 
        openModal={(imgs, idx) => setModalData({images: imgs, initialIndex: idx})} 
        lightBg={false} 
      />
      <ServiceSlider 
        title="Catalogue & Profile" 
        id="catalogues-brochures" 
        description="Xây dựng hồ sơ năng lực doanh nghiệp và danh mục sản phẩm ấn tượng, gia tăng uy tín trong mắt đối tác."
        images={cataloguesBrochuresImages} 
        openModal={(imgs, idx) => setModalData({images: imgs, initialIndex: idx})} 
        lightBg={true} 
      />
      <ServiceSlider 
        title="Thiết kế Bao bì" 
        id="packaging-design" 
        description="Bao bì không chỉ để bảo vệ, mà còn là công cụ kể câu chuyện thương hiệu và thúc đẩy doanh số bán hàng."
        images={packagingDesignImages} 
        openModal={(imgs, idx) => setModalData({images: imgs, initialIndex: idx})} 
        lightBg={false} 
      />
      <ServiceSlider 
        title="Dịch vụ khác" 
        id="other-designs" 
        description="Từ danh thiếp đến bộ văn phòng, chúng tôi đáp ứng mọi nhu cầu đồ họa sáng tạo cho doanh nghiệp của bạn."
        images={otherDesignsImages} 
        openModal={(imgs, idx) => setModalData({images: imgs, initialIndex: idx})} 
        lightBg={true} 
      />

      {/* Marquee UI */}
      <div className="py-24 bg-white overflow-hidden border-y border-gray-100 flex items-center">
        <div className="flex animate-marquee whitespace-nowrap space-x-32">
          {["THIẾT KẾ ĐỘC QUYỀN", "NÂNG TẦM THƯƠNG HIỆU", "GIẢI PHÁP SÁNG TẠO", "ĐỒNG HÀNH PHÁT TRIỂN"].map((t, i) => (
            <span key={i} className="text-6xl md:text-8xl font-black tracking-tighter uppercase marquee-text-fill">{t}</span>
          ))}
        </div>
      </div>

      {/* Blog/News */}
      <section id="blog" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">Blog & Chia sẻ</h2>
            <div className="h-1.5 w-20 bg-[#ff5733] rounded-full"></div>
          </div>
          <Swiper spaceBetween={30} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} className="pb-12">
            {blogArticles.map((article, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full border border-gray-100 group">
                  <div className="h-52 overflow-hidden">
                    <SmartImage src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 duration-1000" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-4 line-clamp-2 hover:text-[#ff5733] transition-colors">{article.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">{article.summary}</p>
                    <button className="text-[#ff5733] font-black text-xs uppercase tracking-widest inline-flex items-center">Xem thêm <span className="ml-2">→</span></button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Contact Form */}
      <section id="register" className="py-24 max-w-6xl mx-auto px-4">
        <div className="bg-[#ff5733] p-12 md:p-20 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-5xl font-black mb-8 uppercase tracking-tighter leading-none">Bắt đầu câu chuyện của bạn</h2>
            <p className="text-orange-100 mb-10 font-medium">Để lại thông tin, Gana sẽ liên hệ tư vấn trong vòng 15 phút.</p>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-5" action="https://formspree.io/f/meorjqjg" method="POST">
              <input name="name" className="w-full p-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 outline-none focus:bg-white/20 transition-all" placeholder="Họ tên*" required aria-label="Họ tên" />
              <input name="phone" className="w-full p-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 outline-none focus:bg-white/20 transition-all" placeholder="Số điện thoại*" required aria-label="Số điện thoại" />
              <button className="md:col-span-2 py-6 bg-gray-900 text-white font-black rounded-2xl hover:bg-black hover:-translate-y-1 transition-all uppercase tracking-widest shadow-xl">Gửi yêu cầu tư vấn</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          <div>© 2026 GANADESIGN STUDIO - CREATIVE AGENCY</div>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-black transition-colors">Thiết kế Logo</a>
            <a href="#" className="hover:text-black transition-colors">Bao bì</a>
          </div>
        </div>
      </footer>

      {/* Floating UI */}
      <div className="fixed bottom-10 right-8 z-[90] flex flex-col space-y-4 scale-90 md:scale-100">
        <a href="tel:0902979699" className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all animate-bounce-slow" aria-label="Gọi điện thoại">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.1 15.1 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.57a1 1 0 01-.27 1.11z" /></svg>
        </a>
        <a href="https://zalo.me/0902979699" target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border border-blue-50">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo Gana Design" className="w-10 h-10" />
        </a>
        <a href="https://www.facebook.com/gana.agency" target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
          <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
        </a>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#ff5733] hover:scale-110 active:scale-95 transition-all">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" /></svg>
        </button>
      </div>

      <AnimatePresence>
        {modalData && <ImageModal modalData={modalData} onClose={() => setModalData(null)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;