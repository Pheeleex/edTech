import React from 'react'
import Button from './Button'
import CustomSlider from './CustomSlider'

const Hero = () => {
  const images = [
                  '/assets/images/frontend-eng.jpg',
                  '/assets/images/backend-eng.jpg', 
                  '/assets/images/data-science.jpg',
                  '/assets/images/ml.jpg'
                ]
  return (
    <div className='flex flex-col justify-center items-center gap-8'>
        <div className=' flex flex-col mt-16 md:mt-24 justify-center items-center gap-6'>
            <h1 className='h1'>Join the bootcamp that pays off</h1>
            <h3 className='h3 text-center'>Take the fast and reliable path to tech</h3>
        </div>
        <div className='w-[90%] max-w-[350px] mx-auto h-[350px]'>
            <CustomSlider
              items={images}
              width={300}
              height={1000}
            />
        </div>
        <Button
         id="product-button"
         title="Register now"
         containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
        />
    </div>
  )
}

export default Hero