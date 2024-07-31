import React, { useState } from "react";
import BackdropExample from "./BackdropExample";
import { Toast, useDisclosure, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { otpUpdater } from "../redux/OTP/actionCreator";
import { addData } from "../redux/SignInData/actionCreator";
import { LoginModal } from "./LoginModal";

export const Sign = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen:isOpen1, onOpen:onOpen1, onClose:onClose1 } = useDisclosure();
  const [signData, setSignData] = useState({
    userName: "",
    email: "",
    password: "",
    avtar:null,
  });
  const dispatch = useDispatch();
  const state = useSelector((state) => state.OTP);
  const state1 = useSelector((state) => state.signIn);
  const toast=useToast()
  console.log(state1);
  async function submit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://porifolio-builder-backend-1.onrender.com/api/v1/users/send-otp",
        { email: signData.email }
      );
      dispatch(otpUpdater(data.opt));
      dispatch(addData(signData));
      onOpen();
    } catch (error) {
      alert("Something went wrong");
    }
  }

  //toast 

  function notification(){
    
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      })
    
  }

  return (
    <div className="md:max-w-[40%] border mx-auto p-10 grid grid-cols-1 mt-5 pb-20 ">
      <div className=" md:text-[25px] text-[20px] font-bold text-center 0">
        Register
      </div>
      <div>
        <form action="" onSubmit={submit}>
          <label htmlFor="" className="font-bold text-[black]">
            Full name
          </label>
          <input
            className="w-[100%] border-2 mb-4 rounded-lg h-[45px] p-2"
            type="text"
            onChange={(e) => {
              setSignData({
                ...signData,
                userName: e.target.value,
              });
            }}
          />

          <label htmlFor="" className="font-bold  text-[black]">
            Email
          </label>
          <input
            className="w-[100%] border-2  mb-4 rounded-lg h-[45px] p-2"
            type="email"
            onChange={(e) => {
              setSignData({
                ...signData,
                email: e.target.value,
              });
            }}
          />

          <label htmlFor="" className="font-bold  text-[black]">
            Password
          </label>
          <input
            className="w-[100%] border-2  mb-4 rounded-lg h-[45px] p-2"
            type="password"
            onChange={(e) => {
              setSignData({
                ...signData,
                password: e.target.value,
              });
            }}
          />

          <label htmlFor="" className="font-bold  text-[black]">
            Profile piture
          </label>
          <input
            className="w-[100%] border-2  mb-10 rounded-lg h-[45px] p-2"
            type="file"
            onChange={(e) => {
              setSignData({
                ...signData,
                avtar: e.target.files[0],
              });
            }}
          />
          <input type="submit" value="Continue" className="w-[100%] bg-[#3F83F8] p-3 rounded-lg text-[white] font-semibold"/>
        </form>
       
       
       <div className="text-[18px] text-center mt-3">
       <span>Already have an account?</span>
       <button onClick={()=>onOpen1()} className="text-[#3F83F8]">Login</button>
       </div>
     
       
       
      </div>
      <BackdropExample isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <LoginModal isOpen={isOpen1} onOpen={onOpen1} onClose={onClose1}/>

    </div>
  );
};
