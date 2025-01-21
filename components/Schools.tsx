import React from 'react';
import Image from 'next/image';
import HowWeWork from './HowWeWork';
import Link from 'next/link';

const Schools = () => {
  const courses = [
    {
      img: '/assets/Images/swe2.jpg',
      title: 'Software Engineering',
      duration: '9 months',
      description: 'Software Engineers build the apps and websites you use every day. '
    },
    {
      img: '/assets/Images/BI.jpg',
      title: 'Business Intelligence Analytics',
      duration: '4 months',
      description: `Use accessible tools to make data useful and insightful. Become indispensible
       without having to code`
    },
    {
      img: '/assets/Images/data.jpg',
      title: 'Data Science',
      duration: '6 months',
      description: `Train AI/ML models, turn raw data into predictions`
    },
    {
      img: '/assets/Images/UI-UX.jpg',
      title: 'UI/UX Design',
      duration: '4 months',
      description: `Design websites, apps and enterprise software, to make them easy to use.`
    },
    {
      img: '/assets/Images/swe2.jpg',
      title: 'Cyber Security',
      duration: '7 months',
      description: `Protect people, organisations, networks and data from breaches and online threat.`
    },
    {
      img: '/assets/Images/data.png',
      title: 'Quality Assurance',
      duration: '9 months',
      description: `Break code and document the results without having to code.`
    },
  ];

  return (
    <section className="bg-blue-50 p-4 md:p-8 lg:p-12 pt-[8rem] w-full">
      <div className=" mx-auto px-4 lg:px-6">
        <h2 className="w-full text-5xl font-bold text-center mb-8">
          Explore each Program
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
              <div className="p-8">
                <h3 className="text-xl font-semibold text-dark-100">
                  {course.title}
                </h3>
                <p className="text-gray-600 mt-2">Duration: {course.duration}</p>
                <p className="text-gray-600 mt-2">{course.description}</p>
                <button className="mt-4 bg-dark-300 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white shadow-lg rounded-xl m-8 p-8 w-full text-center relative mx-auto">
          {/* Image Positioned at the Top */}
          <Image
            src="/assets/Images/button.jpg"
            alt="button"
            width={150}
            height={150}
            className="absolute top-0 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          />

          {/* Title */}
          <h1 className="text-2xl font-extrabold text-gray-800 mb-4 mt-20">
            Not sure yet? Take a career quiz
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-6">
            Find your path in under 5 minutes
          </p>

          {/* Button */}
          <Link href='/quiz'  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition-transform transform hover:scale-105 focus:ring-2 focus:ring-blue-300 focus:outline-none">
            Take the quiz
          </Link>
        </div>


      </div>
      <HowWeWork />
    </section>
  );
};

export default Schools;
