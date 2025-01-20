import Image from 'next/image';
import React from 'react';
import AuthForm from './AuthForm';

const Cta = () => {
  const images = ['/assets/Images/sp.jpg', '/assets/Images/isw.jpg', '/assets/Images/is.jpg'];

  return (
    <div className="w-full bg-gradient-to-r from-blue-400 to-blue-600 p-10 lg:p-20 flex flex-col lg:flex-row justify-center items-center gap-12">
      {/* Alumni Section */}
      <div className="text-center">
        <div className="flex justify-center space-x-[-20px]">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image}
                alt="alumni"
                width={400}
                height={400}
                className="rounded-full h-[100px] w-[100px] border-4 border-white shadow-xl"
              />
            </div>
          ))}
        </div>
        <h1 className="mt-6 text-2xl lg:text-3xl font-extrabold text-white leading-snug">
          Ready to start the year strong? <br />
          <span className="text-yellow-300">Book a call</span> by February 23 to take <br />
          <span className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-lg">25% off</span> your tuition!
        </h1>
      </div>

      {/* Form Section */}
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <AuthForm type="sign-up" />
      </div>
    </div>
  );
};

export default Cta;
