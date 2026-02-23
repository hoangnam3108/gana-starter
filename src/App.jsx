import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Keyboard } from "swiper/modules"; 
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Lenis from '@studio-freight/lenis';

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
        alt={alt || "Gana Design Portfolio"}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        decoding="async"
        className={`${className} transition-all duration-1000 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110 blur-md'}`}
      />
    </div>
  );
}

function ImageModal({ modalData, onClose }) {
  if (!modalData) return null;
  const { images, initialIndex } = modalData;
  const [currentIndex, setCurrentIndex] = useState(initialIndex + 1);

  const dragY = useMotionValue(0);
  const opacity = useTransform(dragY, [0, 200], [1, 0]);
  const scale = useTransform(dragY, [0, 200], [1, 0.95]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/98 flex items-center justify-center z-[100] backdrop-blur-xl" 
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-gray-900 hover:text-[#ff5733] p-2 z-[110] transition-all active:scale-90">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <motion.div 
        style={{ y: dragY, opacity, scale }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={(e, info) => info.offset.y > 100 && onClose()}
        className="relative w-full max-w-5xl h-[80vh] flex flex-col justify-center items-center px-4" 
        onClick={(e) => e.stopPropagation()}
      >
        <Swiper 
          modules={[Navigation, Keyboard]} 
          initialSlide={initialIndex} 
          navigation={true}
          keyboard={{ enabled: true }} 
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex + 1)}
          spaceBetween={20} 
          slidesPerView={1} 
          loop={true}
          className="w-full h-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i} className="flex items-center justify-center pointer-events-none">
              <img src={img} alt="Full View" className="max-w-full max-h-full object-contain pointer-events-auto shadow-2xl rounded-lg" />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute -bottom-16 flex flex-col items-center gap-3">
          <div className="bg-gray-900 text-white px-5 py-1.5 rounded-full text-xs font-black tracking-widest shadow-lg">
            {currentIndex} / {images.length}
          </div>
          <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-bold animate-pulse">Vuốt dọc để thoát</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ServiceSlider({ title, description, images, id, openModal, lightBg = true }) {
  const displayImages = images.slice(0, 16); // Hiển thị nhiều ảnh hơn một chút ở trang chủ
  return (
    <motion.section 
      id={id} 
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`py-20 md:py-32 ${lightBg ? 'bg-white' : 'bg-[#fafafa]'}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8"> 
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">{title}</h2>
          <div className="h-1.5 w-16 bg-[#ff5733] rounded-full mb-6"></div>
          <p className="max-w-2xl text-gray-500 font-medium leading-relaxed px-4 italic">"{description}"</p>
        </div>
        
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={2.2}
          navigation
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{ 640: { slidesPerView: 3 }, 1024: { slidesPerView: 4, spaceBetween: 30 } }}
          className="pb-16"
        >
          {displayImages.map((img, i) => (
            <SwiperSlide key={i}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
                onClick={() => openModal(images, i)}
              >
                <div className="aspect-[3/4] p-4 md:p-6">
                  <SmartImage src={img} alt={title} className="w-full h-full object-contain group-hover:scale-105 duration-700" />
                </div>
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
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalData ? 'hidden' : 'unset';
  }, [modalData]);

  return (
    <div className="font-sans text-gray-900 selection:bg-[#ff5733] selection:text-white overflow-x-hidden antialiased">
      <header className="fixed top-0 inset-x-0 z-[60] bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4 px-6">
          <a href="#home" className="flex items-center group shrink-0">
            <img src="/favicon.png" alt="Gana" className="h-8 md:h-10 w-auto mr-3" />
            <span className="font-black text-xl md:text-2xl tracking-tighter text-gray-900 uppercase">Gana Design</span>
          </a>
          <nav className="flex items-center space-x-4 md:space-x-10 font-bold uppercase tracking-widest text-gray-500">
            <a href="#logo-design" className="text-[10px] md:text-xs hover:text-[#ff5733] transition-colors">Dự án</a>
            <a href="#register" className="bg-gray-900 text-white px-5 py-2.5 md:px-8 md:py-3 rounded-full hover:bg-[#ff5733] transition-all shadow-lg text-[10px] md:text-xs">Liên hệ</a>
          </nav>
        </div>
      </header>

      <section id="home" className="relative h-[70vh] md:h-[85vh] overflow-hidden bg-black pt-20">
        <Swiper modules={[Autoplay, Navigation]} navigation autoplay={{ delay: 7000 }} loop className="h-full w-full">
          {bannerImages.map((img, i) => (
            <SwiperSlide key={i}><SmartImage src={img} className="w-full h-full object-cover opacity-80" /></SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[{ label: "Dự án thực hiện", value: "1000+" }, { label: "Khách hàng", value: "500+" }, { label: "Kinh nghiệm", value: "05+" }, { label: "Hài lòng", value: "99%" }].map((stat, i) => (
            <div key={i}><div className="text-4xl md:text-5xl font-black text-[#ff5733] mb-2 tracking-tighter">{stat.value}</div><div className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">{stat.label}</div></div>
          ))}
        </div>
      </section>

      {/* Đầy đủ các mục dịch vụ */}
      <ServiceSlider title="Thiết kế Logo" id="logo-design" description="Sáng tạo biểu tượng độc bản, nâng tầm vị thế thương hiệu." images={logoImages} openModal={(imgs, idx) => setModalData({images: imgs, initialIndex: idx})} />
      <ServiceSlider title="Banner & Poster" id="banners-posters" description="Giải pháp quảng cáo chuyên nghiệp trên đa nền tảng." images={bannersPostersStandeesImages} openModal={(imgs, idx) => setModalData({images: imgs, initialIndex: idx})} lightBg={false} />
      <ServiceSlider title="Catalogue & Profile" id="catalogues-brochures" description="Hồ sơ năng lực ấn tượng, gia tăng uy tín trước đối tác." images={cataloguesBrochuresImages} openModal={(imgs, idx) => setModalData({images: imgs, initialIndex: idx})} />
      <ServiceSlider title="Thiết kế Bao bì" id="packaging-design" description="Công cụ kể câu chuyện thương hiệu và thúc đẩy doanh số." images={packagingDesignImages} openModal={(imgs, idx) => setModalData({images: imgs, initialIndex: idx})} lightBg={false} />
      <ServiceSlider title="Dịch vụ khác" id="other-designs" description="Từ danh thiếp đến bộ văn phòng, chúng tôi đáp ứng mọi nhu cầu đồ họa sáng tạo." images={otherDesignsImages} openModal={(imgs, idx) => setModalData({images: imgs, initialIndex: idx})} />

      {/* Hiệu ứng Marquee */}
      <div className="py-24 bg-white overflow-hidden border-y border-gray-100 flex items-center text-gray-200 font-black text-6xl md:text-8xl">
        <div className="flex animate-marquee whitespace-nowrap space-x-32 uppercase opacity-10">
          {["THIẾT KẾ ĐỘC QUYỀN", "NÂNG TẦM THƯƠNG HIỆU", "GIẢI PHÁP SÁNG TẠO", "ĐỒNG HÀNH PHÁT TRIỂN"].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      {/* Blog & Articles */}
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
                    <h3 className="text-xl font-bold mb-4 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">{article.summary}</p>
                    <button className="text-[#ff5733] font-black text-xs uppercase tracking-widest inline-flex items-center">Xem thêm <span className="ml-2">→</span></button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section id="register" className="py-24 max-w-6xl mx-auto px-4">
        <div className="bg-[#ff5733] p-12 md:p-24 rounded-[3rem] text-white shadow-2xl text-center relative overflow-hidden">
          <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter">Bắt đầu ngay hôm nay</h2>
          <p className="text-orange-100 mb-12 font-medium">Gana Design sẽ liên hệ tư vấn trong vòng 15 phút.</p>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto" action="https://formspree.io/f/meorjqjg" method="POST">
            <input name="name" className="w-full p-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 outline-none" placeholder="Họ tên*" required />
            <input name="phone" className="w-full p-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 outline-none" placeholder="Số điện thoại*" required />
            <button className="md:col-span-2 py-6 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all uppercase tracking-widest shadow-xl">Gửi yêu cầu</button>
          </form>
        </div>
      </section>

      <footer className="bg-white py-12 border-t border-gray-100 text-center text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
        © 2024 GANA DESIGN - CREATIVE AGENCY
      </footer>

      <div className="fixed bottom-10 right-8 z-[90] flex flex-col space-y-4 scale-90 md:scale-100">
        <a href="tel:0902979699" className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all active:scale-95"><svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.1 15.1 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.57a1 1 0 01-.27 1.11z" /></svg></a>
        <a href="https://zalo.me/0902979699" target="_blank" rel="noreferrer" className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border border-blue-50"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo" className="w-10 h-10" /></a>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#ff5733] transition-all"><svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" /></svg></button>
      </div>

      <AnimatePresence>
        {modalData && <ImageModal modalData={modalData} onClose={() => setModalData(null)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;