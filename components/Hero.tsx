import React from 'react'
import Button from './Button'
import CustomSlider from './CustomSlider'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



const Hero = () => {
  const courses = [
                    {
                      url:'/assets/Images/frontend-eng.jpg',
                      course: 'Frontend Engineering'
                    },
                    {
                      url:  '/assets/Images/backend-eng.jpg', 
                      course: 'Backend Engineering'
                    },
                    {
                      url: '/assets/Images/data-science.jpg',
                      course: 'Datascience'
                    },
                 {
                    url:   '/assets/Images/ml.jpg',
                    course: 'Machine Learning'
                 }   
                ]
  return (
    <div className='h-dvh'>
      <div className='flex flex-col gap-8  justify-center items-center'>
        <div className='px-4 flex flex-col justify-center items-center gap-6 mt-8'>
            <h1 className='h1 text-center'>Join the bootcamp that pays off</h1>
            <h3 className='h3 text-center'>Take the fast and reliable path to tech</h3>
        </div>
        <div className='w-[90%] max-w-[350px] mx-auto'>
            <CustomSlider 
            items={courses}
            />
        </div>
        <Button
         id="product-button"
         title="Register now"
         containerClass="bg-blue-50 flex items-center justify-center gap-1"
        />
    </div>
    </div>
  )
}

export default Hero