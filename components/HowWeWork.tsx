import React from "react";

const HowWeWork = () => {
  const steps = [
    {
      step: "Constant Practice",
      desc: `Our platform serves up concepts and coding practice in bite-size lessons, 
      so you're always reinforcing what you just learned.`,
    },
    {
      step: "Nonstop Support",
      desc: `1-on-1 tutoring, daily tutor office hours, hundreds of video lessons, 
      and a personal success manager to keep you on track!`,
    },
    {
      step: "Real-world Projects",
      desc: `Build real-world projects and get personalized feedback 
      from a professional developer`,
    },
    {
      step: "Dedicated Career Services",
      desc: `We provide resume support, interview prep, and exclusive access 
      to job opportunities.`,
    },
  ];

  return (
    <div className="bg-white w-full lg:w-3/4 py-12 px-4 md:px-8 flex flex-col items-center justify-center mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Go from newbie to pro <br /> in months — here is how:
      </h1>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {steps.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center md:items-start text-center md:text-left"
          >
            {/* Step Title */}
            <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mb-4">
              {index + 1}
            </div>
            {/* Step Heading */}
            <h2 className="text-xl font-bold text-gray-800 mb-2">{item.step}</h2>
            {/* Step Description */}
            <p className="text-gray-600">{item.desc}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowWeWork;
