import React from 'react';
//import { CheckCircleIcon } from '@heroicons/react/solid'; // Example using Heroicons

const Process = () => {
  const items = [
    "Skill-based curriculum",
    "Routine Practice",
    "Project-based portfolio",
    "Resume Recruiters will love",
    "Job interview preparation",
    "Alumni network",
  ];

  return (
    <div className="absolute top-[34rem] md:top-[34rem] lg:top-[36rem] 
    left-0 right-0 mx-auto w-4/5 bg-white shadow-xl z-20 rounded-lg p-6">
      <h2 className="text-center text-2xl font-bold mb-4">
        How we help you with your tech journey
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-green-500"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-800">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
  export default Process