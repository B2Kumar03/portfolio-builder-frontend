import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const stateAuth = useSelector((state) => state.auth);
  const stateSign = useSelector((state) => state.signIn);
  const [clickState,setClickState]=useState(false)
  console.log(stateSign.data.user);
  return (
    <div class="max-w-[100%] mx-auto py-[20px] flex  drop-shadow-md border justify-between bg-[white] px-[50px] items-center mb-10">
      <div class="text-[30px] ">Portfolio Builder</div>
       {clickState?
        <div className="max-w-[20%] absolute left-[87%] top-[55px] grid grid-cols-1 gap-3 bg-[white] duration-500  p-7 drop-shadow-md rounded-md border">
        <div className="font-bold border-b p-2">Bittu Kumar</div>
        <div className="hover:cursor-pointer hover:font-medium">My portfolio</div>
        <div className="hover:cursor-pointer hover:font-medium">Profile</div>
        <div className="hover:cursor-pointer hover:font-medium">Sign out</div>
       </div>:null
       }
      <div class="text-2xl hover:cursor-pointer relative" onClick={()=>setClickState((prev)=>!prev)}>
        {
          stateAuth.auth?
          <img src={stateSign.data.user.avtar} alt="userAvtar" className="h-[30px] w-[30px] rounded-full"/>:
          <FaRegUserCircle />
          
        }
        
      </div>
    </div>
  );
};

export default Navbar;
