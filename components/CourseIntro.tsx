import Image from 'next/image'
import React from 'react'

const CourseIntro = () => {
  return (
    <div className='w-full p-10 '>
        <Image 
            src='/assets/Images/data.jpg' 
            alt='swe'
            height={400}
            width={400}
            className='w-full h-[500px] rounded-xl'
            />
    </div>
  )
}

export default CourseIntro
