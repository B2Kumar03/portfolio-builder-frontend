import React from 'react'
import { MdOutlineCloudDone } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
const Skills = () => {
  return (
    <div className='border bg-[#ef4e4e] p-10 rounded-lg grid gap-5 grid-cols-1'>
      <div>
        <div className='font-bold text-[18px] flex gap-2 items-center'>
          <div className='text-[#3F83F8]'>Personal Details</div>
          <div className='text-[15px] font-medium text-[#ccc] ' >Saved</div>
          <div className='text-[15px]'><MdOutlineCloudDone/></div>
        </div>
      </div>
      <div>
        <div className='w-[100px] w-[100px] rounded-full relative'>
          
        <div className="relative">
      <label
        htmlFor="file-upload"
        className="absolute top-[50px] left-20 rounded-full bg-white p-2 text-black cursor-pointer"
        style={{ display: 'inline-block' }}
      >
        <MdOutlineEdit/>
      </label>
      <input
        id="file-upload"
        type="file"
        className="absolute top-[50px] left-20 rounded-full bg-[white] p-2 text-[white] outline-none opacity-0 w-0 h-0"
      />
    </div>
          <figure >
            <img className='w-[100px] w-[100px] rounded-full ' src="https://masai-resume-builder-user-data.s3.ap-south-1.amazonaws.com/test/profile-image/6557791b2bea09fa16045e4f/la2t.jpg" alt="" />
          </figure>
        </div>
      </div>
      <div>
        <p>Full name</p>
        <input className='w-[100%] border-2 rounded-lg h-[45px] p-2' type="text" />
      </div>
      <div>
      <p>Professional summary</p>
      <textarea type="" className='w-[100%] border-2 rounded-lg h-[100px] p-5'  />
      </div>
      <div>
      <p>Phone Number</p>
      <input className='w-[100%] border-2 rounded-lg h-[45px] p-2' type="number" />
      </div>
      <div>
      <p>Email</p>
      <input className='w-[100%] border-2 rounded-lg h-[45px] p-2' type="email" />
      </div>
      <div>
      <p>Linkedin</p>
      <input className='w-[100%] border-2 rounded-lg h-[45px] p-2' type="text" />
      </div>
      <div>
        <p>Github</p>
        <input className='w-[100%] border-2 rounded-lg h-[45px] p-2' type="text" />
      </div>
      <div>
        <p>Location</p>
        <input className='w-[100%] border-2 rounded-lg h-[45px] p-2' type="text" />
      </div>
      <div className=' border-3 p-2 mt-5 flex place-content-end'>
        <button className='bg-[#3F83F8] border-3 p-4 mt-5 place-content-end tex-[20px] font-bold text-[white] rounded-lg'>
          Continue
        </button>
      </div>
    </div>
  )
}

export default Skills