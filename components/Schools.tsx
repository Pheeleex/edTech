import React from 'react';
import Image from 'next/image';

const Schools = () => {
  const courses = [
    {
      img: '/assets/Images/swe2.jpg',
      title: 'Software Engineering',
      duration: '9 months',
    },
    {
      img: '/assets/Images/BI.jpg',
      title: 'Business Intelligence Analytics',
      duration: '4 months',
    },
    {
      img: '/assets/Images/data.jpg',
      title: 'Data Science',
      duration: '6 months',
    },
    {
      img: '/assets/Images/UI-UX.jpg',
      title: 'UI/UX Design',
      duration: '4 months',
    },
    {
      img: '/assets/Images/swe2.jpg',
      title: 'Cyber Security',
      duration: '7 months',
    },
    {
      img: '/assets/Images/data.png',
      title: 'AI & Machine Learning',
      duration: '9 months',
    },
  ];

  return (
    <section className="bg-blue-50 py-16 pt-[8rem]">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-8">
          Explore each Program
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={course.img}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-blue-800">
                  {course.title}
                </h3>
                <p className="text-gray-600 mt-2">Duration: {course.duration}</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schools;
