import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { GiSkills } from "react-icons/gi";
const Sidenavbar = () => {
  return (
    <div className=" max-auto grid grid-cols-1 p-[40px] gap-[30px] text-[20px] bg-[white] rounded-xl">
      <div className='flex gap-2 items-center hover:drop-shadow-2xl hover:cursor-pointer hover:bg-[#ccc] p-[10px] rounded-md duration-700'>
        <div className='border rounded-full p-[10px] '>
        <FaRegUser />
        </div>
        <div class="font-bold">
          Personal Details
        </div>
      </div>
      <div className='flex gap-2 items-center hover:drop-shadow-2xl hover:cursor-pointer hover:bg-[#ccc] p-[10px] rounded-md duration-700'>
        <div className='border rounded-full p-[10px] bg-[#46B8BC]'><GoProjectSymlink /></div>
        <div className='font-bold'>Project</div>
      </div>
      <div className='flex gap-2 items-center hover:drop-shadow-2xl hover:cursor-pointer hover:bg-[#ccc] p-[10px] rounded-md duration-700'>
        <div className='border rounded-full p-[10px] bg-[#CC926E]'><GiSkills /></div>
        <div className='font-bold'>Skills</div>
      </div>
      <div className='mt-[100px]'></div>
    </div>
  )
}

export default Sidenavbar