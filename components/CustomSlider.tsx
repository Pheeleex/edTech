'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const containerStyles =
  "relative flex flex-col items-center bg-white overflow-hidden justify-center py-4";
const imageContainerStyles =
  "relative w-full flex justify-center items-center overflow-hidden";
const dotsContainerStyles = "absolute bottom-4 flex justify-center w-full";
const dotStyle = "mx-1 cursor-pointer w-2 h-2 rounded-full bg-gray-400";
const activeDotStyle = "bg-red-600";

interface CustomSliderProps {
  items: string[]; // Array of image URLs
  width: number;
  height: number;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ items, width, height }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className={`${containerStyles} w-full h-full rounded-lg`}
      style={{ maxHeight: "400px" }}
    >
      <div className={imageContainerStyles} style={{ height: "80%" }}>
        {items.map((url, index) => (
          <Image
            src={items[currentIndex]}
            alt={`Slide ${index + 1}`}
            className="slide-img"
            aria-hidden={currentIndex !== index}
            key={index}
            width={width}
            height={height}
          />
        ))}
      </div>
      <div className={dotsContainerStyles}>
        {items.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`${dotStyle} ${index === currentIndex ? activeDotStyle : ""}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomSlider;
