import Link from 'next/link';
import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='bg-[#2563eb] min-h-screen flex justify-center items-center'>
        
        <div className="text-white">
        <h2 className='text-white font-extrabold text-6xl md:text-8xl'>404</h2>
        <h2 className='font-bold'> <span className='text-2xl block mb-2'>Ooops! </span> <span className='mt-2'>Could not find what you are looking for?</span></h2>
        <Link href="/" className='bg-transparent border-white border text-white hover:text-black hover:bg-white transition-all duration-200  p-3 inline-block rounded-sm mt-2'>Go back Home</Link>
        </div>
    </div>
  )
}

export default NotFoundPage;
