import React from 'react'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between py-2 px-[4%]'>
        <span className='text-2xl'>ClothEase Admin Panel</span>
      <button onClick={(e)=>{setToken("")}} className='bg-gray-600 text-white px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm'>Log Out</button>
    </div>
  )
}

export default Navbar
