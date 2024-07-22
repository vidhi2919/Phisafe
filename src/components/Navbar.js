import React from 'react'
import "../globals.css"
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='h-[7dvh] bg-gray-950 flex justify-between px-8 py-1 items-center '>
        <div className="flex right text-white font text-[2.5vw]">
            <p className='text-[#2ddd24]'>&lt;&nbsp;</p>
            <p>PhiSafe</p>
            <p className='text-[#2ddd24]'>&nbsp;/&gt;</p>
        </div>
        <div className='flex left text-white font text-[1vw]'>
            <ul className='flex gap-[2vw]'>
                <li><Link href={"./"} className='hover:text-[#2ddd24] transition-colors duration-300'>Home</Link></li>
                <li><Link href={"./about"} className='hover:text-[#2ddd24] transition-colors duration-300'>About</Link></li>
                {/* <li><Link href={"./bot"} className='hover:text-[#2ddd24] transition-colors duration-300'>ChatBot</Link></li>
                <li><Link href={"./urlchecker"} className='hover:text-[#2ddd24] transition-colors duration-300'>URL Checker</Link></li>
                <li><Link href={"./contacts"}></Link></li> */}
            </ul>
        </div>
    </div>
  )
}

export default Navbar