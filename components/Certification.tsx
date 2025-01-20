import Image from 'next/image';

const Certifications = () => {
  return (
    <div className="pt-[24rem] md:pt-[11rem] pb-8 bg-blue-100 flex flex-col justify-center items-center text-center">
      {/* Section Title */}
      <h1 className="flex items-center justify-center text-5xl font-extrabold text-gray-800">
        Get a job in tech
        <Image
          src="/assets/Images/cursor.svg"
          alt="cursor"
          width={50}
          height={50}
          className="ml-3 animate-bounce"
        />
      </h1>

    

      {/* Subheading */}
      <span className="text-4xl font-bold text-gray-700 mt-4">with</span>
      <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 text-transparent bg-clip-text mt-2">
        One of the best online bootcamps
      </h2>

      {/* Certification Image */}
      <Image
        src="/assets/Images/certi.png"
        alt="certifications"
        width={900}
        height={900}
        className="w-[95%] max-w-[600px] mt-8 "
      />
    </div>
  );
};

export default Certifications;
