import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Keyboard } from "swiper/modules"; 
import { motion } from "framer-motion";
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

// Cấu hình hiệu ứng cuộn mượt (Fade In Up)
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

function ImageModal({ modalData, onClose }) {
  if (!modalData) return null;
  const { images, initialIndex } = modalData;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4" onClick={onClose}>
      <div className="relative w-full max-w-4xl h-[85vh] bg-white p-2 rounded-2xl shadow-2xl flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
        <Swiper modules={[Navigation, Keyboard]} initialSlide={initialIndex} navigation keyboard={{ enabled: true }} spaceBetween={10} slidesPerView={1} className="w-full h-full">
          {images.map((img, i) => (
            <SwiperSlide key={i} className="flex items-center justify-center">
              <img src={img} alt={`View ${i + 1}`} className="max-w-full max-h-full object-contain rounded-lg" />
            </SwiperSlide>
          ))}
        </Swiper>
        <button onClick={onClose} className="absolute -top-4 -right-4 text-white bg-red-600 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-110 transition-transform">✕</button>
      </div>
    </div>
  );
}

function ServiceSlider({ title, images, id, openModal, lightBg = true }) {
  return (
    <motion.section 
      id={id} 
      className={`py-24 ${lightBg ? 'bg-white' : 'bg-gray-50'}`} 
      {...fadeInUp}
    >
      <div className="max-w-6xl mx-auto px-4"> 
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-3">{title}</h2>
          <div className="h-1.5 w-24 bg-[#ff5733] rounded-full"></div>
        </div>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          navigation
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-12 px-2"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div 
                className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_20px_50px_rgba(255,87,51,0.2)] hover:-translate-y-3 transition-all duration-500 border border-gray-100"
                onClick={() => openModal(images, i)}
              >
                <div className="aspect-[3/4] p-4 flex items-center justify-center">
                  <img src={img} alt={title} className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#ff5733] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
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
    if (modalData) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [modalData]);

  return (
    <div className="font-sans text-gray-900 selection:bg-[#ff5733] selection:text-white">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <a href="#home" className="flex items-center group">
            <img src="/favicon.png" alt="Logo" className="h-10 w-auto object-contain" />
            <span className="ml-3 font-black text-xl tracking-tighter text-gray-800 uppercase">Gana Design</span>
          </a>
          <nav className="hidden md:flex space-x-8 font-bold text-sm uppercase tracking-wider text-gray-600">
            <a href="#home" className="hover:text-[#ff5733] transition-colors">Trang chủ</a>
            <a href="#logo-design" className="hover:text-[#ff5733] transition-colors">Dịch vụ</a>
            <a href="#blog" className="hover:text-[#ff5733] transition-colors">Blog</a>
            <a href="#register" className="bg-[#ff5733] text-white px-6 py-2 rounded-full hover:shadow-xl hover:-translate-y-1 transition-all">Đăng ký tư vấn</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative h-[70vh] overflow-hidden bg-gray-900">
        <Swiper modules={[Autoplay, Navigation]} navigation autoplay={{ delay: 6000 }} loop className="h-full w-full">
          {bannerImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full overflow-hidden">
                <img src={img} className="w-full h-full object-cover scale-105 animate-slowZoom opacity-70" alt="Banner" />
                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-4 uppercase tracking-tighter drop-shadow-2xl">Sáng tạo & Đột phá</h1>
                    <p className="text-white/90 text-xl md:text-2xl font-medium">Nâng tầm thương hiệu cùng Gana Design</p>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Stats */}
      <section className="py-20 bg-[#ff5733] text-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Dự án hoàn thành", value: "1000+" },
            { label: "Khách hàng tin tưởng", value: "500+" },
            { label: "Năm kinh nghiệm", value: "10+" },
            { label: "Tỷ lệ hài lòng", value: "99%" }
          ].map((stat, i) => (
            <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }}>
              <div className="text-5xl font-black mb-2">{stat.value}</div>
              <div className="text-orange-100 font-bold uppercase text-[10px] tracking-[0.2em]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dịch vụ */}
      <ServiceSlider title="Thiết kế Logo" id="logo-design" images={logoImages} openModal={(imgs, idx) => setModalData({images: imgs, initialIndex: idx})} lightBg={true} />
      <ServiceSlider title="Banner & Poster" id="banners-posters" images={bannersPostersStandeesImages} openModal={(imgs, idx) => setModalData({images: imgs, initialIndex: idx})} lightBg={false} />
      <ServiceSlider title="Catalogue & Profile" id="catalogues-brochures" images={cataloguesBrochuresImages} openModal={(imgs, idx) => setModalData({images: imgs, initialIndex: idx})} lightBg={true} />
      <ServiceSlider title="Thiết kế Bao bì" id="packaging-design" images={packagingDesignImages} openModal={(imgs, idx) => setModalData({images: imgs, initialIndex: idx})} lightBg={false} />
      <ServiceSlider title="Các thiết kế khác" id="other-designs" images={otherDesignsImages} openModal={(imgs, idx) => setModalData({images: imgs, initialIndex: idx})} lightBg={true} />

      {/* Marquee */}
      <div className="py-12 bg-gray-900 overflow-hidden flex">
        <div className="flex animate-marquee whitespace-nowrap space-x-20 items-center">
          {["SÁNG TẠO", "CHUYÊN NGHIỆP", "UY TÍN", "TẬN TÂM", "ĐẲNG CẤP"].map((t, i) => (
            <span key={i} className="text-4xl font-black text-white/10 tracking-tighter uppercase">{t}</span>
          ))}
        </div>
      </div>

      {/* Blog Section */}
      <motion.section id="blog" className="py-24 bg-white" {...fadeInUp}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-3">Tin tức & Kiến thức</h2>
            <div className="h-1.5 w-24 bg-[#ff5733] rounded-full"></div>
          </div>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 5000 }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="pb-12"
          >
            {blogArticles.map((article, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col group">
                  <div className="relative overflow-hidden h-56">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-[#ff5733] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Design</div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 line-clamp-2 group-hover:text-[#ff5733] transition-colors">{article.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">{article.summary}</p>
                    <a href="#" className="text-[#ff5733] font-bold text-xs uppercase tracking-widest flex items-center group-hover:translate-x-2 transition-transform">Xem thêm <span className="ml-2">→</span></a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.section>

      {/* Register Form */}
      <section id="register" className="py-24 max-w-6xl mx-auto px-4">
        <div className="bg-gray-900 p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-8 uppercase italic">Khởi đầu thương hiệu ngay</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" action="https://formspree.io/f/meorjqjg" method="POST">
              <input name="name" className="w-full p-4 rounded-xl bg-gray-800 text-white outline-none focus:ring-2 focus:ring-[#ff5733]" placeholder="Họ tên*" required />
              <input name="phone" className="w-full p-4 rounded-xl bg-gray-800 text-white outline-none focus:ring-2 focus:ring-[#ff5733]" placeholder="Số điện thoại*" required />
              <input name="email" type="email" className="w-full p-4 rounded-xl bg-gray-800 text-white outline-none focus:ring-2 focus:ring-[#ff5733] md:col-span-2" placeholder="Email*" required />
              <button className="md:col-span-2 py-5 bg-[#ff5733] text-white font-black rounded-xl hover:bg-orange-600 transition-all uppercase tracking-widest shadow-lg">Gửi yêu cầu tư vấn</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer-contact" className="bg-gray-950 text-white py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
       
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em]">&copy; 2025 GanaDesign. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col space-y-4">
        <a href="tel:0902979699" className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-bounce-slow" title="Gọi ngay">
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.1 15.1 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.57a1 1 0 01-.27 1.11z" /></svg>
        </a>
        <a href="https://zalo.me/0902979699" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border border-blue-100" title="Zalo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo" className="w-8 h-8" />
        </a>
        <a href="https://www.facebook.com/gana.agency" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform" title="Facebook">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
        </a>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform text-white text-2xl" title="Lên đầu trang">↑</button>
      </div>

      <ImageModal modalData={modalData} onClose={() => setModalData(null)} />
    </div>
  );
}

export default App;