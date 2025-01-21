import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import img1 from '../../../assets/home/04.webp';
import img2 from '../../../assets/home/02.jpg';
import img3 from '../../../assets/home/03.jpg';
import { Link } from 'react-router-dom';

const Banner = () => {
  const slides = [
    {
      image: img1,
      title: 'Empower Your Education',
      description: 'Discover scholarships and opportunities that can transform your dreams into reality.',
      buttonText: 'Explore Now',
    },
    {
      image: img2,
      title: 'Shape Your Future',
      description: 'Find the best scholarships to support your journey to success.',
      buttonText: 'Get Started',
    },
    {
      image: img3,
      title: 'Unlock Potential',
      description: 'Your pathway to higher education begins with the right resources.',
      buttonText: 'Learn More',
    },
  ];

  return (
    <div className="w-full h-[500px] rounded-lg bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-300 mt-4 mb-8">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
        }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between h-full px-6 md:px-20 py-10">
              {/* Left Content */}
              <div className="text-center lg:text-left lg:w-1/2 lg:pr-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-400 mb-6 leading-relaxed">
                  {slide.description}
                </p>
                <Link to={'/allScholarship'} className="px-6 font-semibold py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  {slide.buttonText}
                </Link>
              </div>

              {/* Right Image */}
              <div className="lg:w-1/2 lg:pl-10">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
