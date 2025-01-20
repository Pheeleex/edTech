'use client';
import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type CourseItem = {
  url: string;
  course: string;
};

interface CustomSliderProps {
  items: CourseItem[];
}

const CustomSlider: React.FC<CustomSliderProps> = ({ items }) => {
  return (
    <Swiper
      spaceBetween={10}
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      className="w-full h-full"
    >
      {items.map((item, index) => (
        <SwiperSlide key={index} className="w-full h-full relative">
          {/* Image Container with overflow hidden and styling for positioning */}
          <div className="w-full h-[240px] md:h-[300px] relative  rounded-xl shadow-lg 
          bg-blue-50 flex flex-col py-2 md:py-4 pb-4 text-center">
            {/* Course Name Container */}
           
              <h1 className='font-bold text-[#161652]'>Learn {item.course} </h1> 

            {/* Image Nested inside container, with reduced height */}
            <Image
              src={item.url}
              alt={item.course}
              width={300}
              height={250} // Reduced height to allow space for course name
              className="object-fit w-full h-[80%] mt-4" // Added margin-top for spacing
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSlider;
