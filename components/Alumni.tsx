import Image from 'next/image';
import React from 'react';

const Alumni = () => {
  const alumniData = [
    {
      name: 'Alice Johnson',
      image: '/assets/Images/chou.jpg',
      formerJob: 'Teacher',
      newTechJob: 'Software Engineer',
    },
    {
      name: 'Bob Smith',
      image: '/assets/Images/sp.jpg',
      formerJob: 'Retail Manager',
      newTechJob: 'Data Analyst',
    },
    {
      name: 'Catherine Lee',
      image: '/assets/Images/isw.jpg',
      formerJob: 'Marketing Specialist',
      newTechJob: 'UI/UX Designer',
    },
    {
      name: 'David Brown',
      image: '/assets/Images/is.jpg',
      formerJob: 'Customer Service Rep',
      newTechJob: 'Cybersecurity Analyst',
    },
    {
      name: 'Eva Martinez',
      image: '/assets/Images/eye.jpg',
      formerJob: 'Nurse',
      newTechJob: 'QA Tester',
    },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-blue-100 p-10 lg:p-20">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-4">
          <Image src="/assets/icons/heart.svg" alt="heart icon" width={50} height={50} />
          Alumni Achievements
        </h1>
        <p className="mt-4 text-lg lg:text-xl text-gray-600">
          Over <span className="bg-blue-500 text-white px-3 py-1 rounded-lg text-2xl">90%</span> transitioned into tech roles
          from non-tech backgrounds.
        </p>
      </div>

      {/* Alumni Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {alumniData.map((alumni, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image Section */}
            <div className="relative">
              <Image
                src={alumni.image}
                alt={alumni.name}
                width={400}
                height={300}
                className="object-cover w-full h-60 rounded-t-lg"
              />
            </div>

            {/* Content Section */}
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">{alumni.name}</h2>
              <div className="flex justify-center items-center gap-8 mt-4">
                {/* Former Job */}
                <div className="text-center">
                  <Image src="/assets/icons/clock.svg" alt="former job" width={24} height={24} />
                  <p className="text-sm text-gray-500 mt-2">Former</p>
                  <p className="text-gray-600 font-medium">{alumni.formerJob}</p>
                </div>
                {/* New Tech Job */}
                <div className="text-center">
                  <Image src="/assets/icons/star.svg" alt="new job" width={24} height={24} />
                  <p className="text-sm text-gray-500 mt-2">Now</p>
                  <p className="text-gray-800 font-bold">{alumni.newTechJob}</p>
                </div>
              </div>

              {/* Button */}
              <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-700 transition">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alumni;
