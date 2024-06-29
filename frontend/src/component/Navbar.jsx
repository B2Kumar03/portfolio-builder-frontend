import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
const Navbar = () => {
  return (
    <div class="max-w-[100%] mx-auto py-[20px] flex  drop-shadow-md border justify-between bg-[white] px-[50px] items-center mb-10">
      <div class="text-[30px] ">Portfolio Builder</div>
      <div class="text-2xl"><FaRegUserCircle /></div>
      
    </div>
  )
}

export default Navbar