import React from 'react'

interface PageProps {
  params: {
    type: string
  }
}



const page = ({params}: PageProps) => {

  const {type} = params

  return (
    <div className='mt-[10rem] bg-slate-300 w-full h-full'>
        <div className='flex justify-center items-center'>
            <div>This is {type} page</div>
        </div>
    </div>
  )
}

export default page
