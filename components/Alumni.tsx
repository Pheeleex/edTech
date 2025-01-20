import Image from 'next/image'
import React from 'react'

const Alumni = () => {
    const alumniData = [
        {
            name: 'Alice Johnson',
            image: '/assets/Images/chou.jpg',
            formerJob: 'Teacher',
            newTechJob: 'Software Engineer'
        },
        {
            name: 'Bob Smith',
            image: '/assets/Images/sp.jpg',
            formerJob: 'Retail Manager',
            newTechJob: 'Data Analyst'
        },
        {
            name: 'Catherine Lee',
            image: '/assets/Images/isw.jpg',
            formerJob: 'Marketing Specialist',
            newTechJob: 'UI/UX Designer'
        },
        {
            name: 'David Brown',
            image: '/assets/Images/is.jpg',
            formerJob: 'Customer Service Rep',
            newTechJob: 'Cybersecurity Analyst'
        },
        {
            name: 'Eva Martinez',
            image: '/assets/Images/eye.jpg',
            formerJob: 'Nurse',
            newTechJob: 'QA Tester'
        }
    ];
    return (
        <div className='w-full bg-blue-50 p-10'>
            <div className='flex flex-col items-center justify-center mx-auto'>
                <h1 className='flex items-center justify-center mx-auto text-xl gap-1 font-bold'>
                    <Image src='/assets/icons/heart.svg' alt='heart' width={100} height={100} />
                    Alumni with over <br /> <span className='bg-blue-500 p-[0.5rem] text-4xl rounded-lg'>90%</span> <br /> from non tech backgrounds
                </h1>
                <div className='flex w-full flex-wrap gap-4 justify-center items-center mt-8'>
                    {
                        alumniData.map((alumni, index) => (
                            <div className='bg-white p-4 rounded-lg w-[30%]' key={index}>
                                <div className='flex flex-col justify-center items-center gap-2'>
                                    <h2 className='text-xl font-semibold mt-2'>{alumni.name}</h2>
                                    {/* Image with curved top left and bottom right */}
                                    <Image
                                        src={alumni.image}
                                        alt={alumni.name}
                                        width={200}
                                        height={300}
                                        className='rounded-tl-[4rem] h-[210px] rounded-br-[4rem] 
                                        object-cover' />

                                    <div className='flex items-center justify-center gap-2 mt-4'>
                                        {/* Former Job and New Tech Job with styling */}
                                        <div>
                                            <Image src='/assets/icons/clock.svg' alt='arrow' width={20} height={20} />
                                            <h3 className='text-gray-500 font-medium text-sm'>former<br></br>{alumni.formerJob}</h3>
                                        </div>
                                        <div>
                                            <Image src='/assets/icons/star.svg' alt='arrow' width={20} height={20} />
                                            <h3 className='text-dark-300 font-bold text-lg'>{alumni.newTechJob}</h3>
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <button className='mt-4 bg-black text-white py-2 px-6  
                                    w-[200px] rounded-lg text-[14px] bg'>
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Alumni;
