import Image from 'next/image'

const Certifications = () => {
    return (
      <div className="pt-[24rem] md:pt-[14rem]  pb-2 bg-blue-100 flex 
      flex-col justify-center items-center">
        <Image
          src="/assets/images/certi.png"
          alt="certifications"
          width={900}
          height={900}
          className="w-[95%] max-w-[600px] mt-4"
        />
      </div>
    );
  };
  export default Certifications