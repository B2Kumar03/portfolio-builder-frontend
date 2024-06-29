import React, { useState } from "react";
import BackdropExample from "./BackdropExample";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { otpUpdater } from "../redux/OTP/actionCreator";
import { addData } from "../redux/SignInData/actionCreator";

export const Sign = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [signData, setSignData] = useState({
    userName: "",
    email: "",
    password: "",
    avtar:null,
  });
  const dispatch = useDispatch();
  const state = useSelector((state) => state.OTP);
  const state1 = useSelector((state) => state.signIn);
  console.log(state1);
  async function submit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/users/send-otp",
        { email: signData.email }
      );
      dispatch(otpUpdater(data.opt));
      dispatch(addData(signData));
      onOpen();
    } catch (error) {
      alert("Something went wrong");
    }
  }

  return (
    <div className="md:max-w-[40%] border mx-auto p-10 grid grid-cols-1 mt-5 ">
      <div className=" md:text-[25px] text-[20px] font-bold text-center 0">
        Sign/Register
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
          <input type="submit" value="Continue" />
        </form>
      </div>
      <BackdropExample isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </div>
  );
};
