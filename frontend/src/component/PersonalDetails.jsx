import React, { useEffect, useState } from "react";
import { MdOutlineCloudDone } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { GenerateModal } from "./GenerateModal";
import { Button, useDisclosure } from "@chakra-ui/react";
import { FiArrowDown, FiPhone } from "react-icons/fi";
import { IoIosArrowRoundDown } from "react-icons/io";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { IoIosCloudOutline } from "react-icons/io";
const PersonalDetails = () => {
  const stateSign = useSelector((state) => state.signIn);
  const [personalDetails, setPersonalDetails] = useState({
    fullName: stateSign.data.user.userName,
    phoneNumber: "",
    email: stateSign.data.user.email,
    linkedIn: "",
    github: "",
    location: "",
    summary: "",
  });
  const [data, setData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    setLoading((prev) => !prev);
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/users/personalDetails",
        personalDetails
      );
      setLoading((prev) => !prev);
      // if (!data.data.success) {
      //   console.log(data.message);
      //   alert(data.message);
      // }
      showSuccessNotification();
    } catch (error) {
      setLoading((prev) => !prev);
      showErrorNotification();
      console.log(error);
    }
  };

  const showSuccessNotification = () => {
    toast({
      title: "Personal details saved Successful",
      description: "",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const showErrorNotification = () => {
    toast({
      title: "Invalid Credential",
      description: "Something went wrong",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  async function getPersonalDetailsData() {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/users/personalDetails",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      if (!data.data.success) {
        console.log(data.message);
        
      }
      console.log(data.data.email);

      setPersonalDetails({
        ...personalDetails,
        fullName: data.data.fullName,
        phoneNumber: data.data.phoneNumber,
        linkedIn: data.data.linkedIn,
        summary: data.data.summary,
        location: data.data.location,
        github: data.data.github,
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getPersonalDetailsData();
  }, []);

  return (
    <div className="border bg-[white] p-10 rounded-lg grid gap-5 grid-cols-1">
      <div>
        <div className="font-bold text-[18px] flex gap-2 items-center">
          <div className="text-[#3F83F8]">Personal Details</div>
          <div className="text-[15px] font-medium text-[#ccc] ">
            {loading ? "Saving..." : "Saved"}
          </div>
          <div className="text-[15px] relative">
            <div className=" animate-bounce font-light absolute bottom-3">
              {!loading ? "" : <FiArrowDown />}
            </div>
            {loading ? <MdOutlineCloudDone /> : <MdOutlineCloudDone />}
          </div>
        </div>
      </div>
      <div>
        <div className="w-[100px] w-[100px] rounded-full relative">
          <div className="relative">
            <label
              htmlFor="file-upload"
              className="absolute top-[50px] left-20 rounded-full bg-white p-2 text-black cursor-pointer"
              style={{ display: "inline-block" }}
            >
              <MdOutlineEdit />
            </label>
            <input
              id="file-upload"
              type="file"
              className="absolute top-[50px] left-20 rounded-full bg-[white] p-2 text-[white] outline-none opacity-0 w-0 h-0"
            />
          </div>
          <figure>
            <img
              className="w-[100px] h-[100px] rounded-full "
              src={stateSign.data.user.avtar}
              alt=""
            />
          </figure>
        </div>
      </div>
      <div>
        <p>Full name</p>
        <input
          className="w-[100%] border-2 rounded-lg h-[45px] p-2"
          type="text"
          value={personalDetails.fullName}
        />
      </div>
      <div>
        <p>Professional summary</p>
        <textarea
          type=""
          className="w-[100%] border-2 rounded-lg h-[170px] p-5"
          value={personalDetails.summary}
          onChange={(e) => {
            setPersonalDetails({
              ...personalDetails,
              summary: e.target.value,
            });
          }}
        />
        <div className="grid place-content-end">
          <button
            className="border p-2 bg-[#075df0] text-[white] font-semibold rounded-md text-[20px] hover:shadow-xl duration-300"
            onClick={() => {
              onOpen();
            }}
          >
            Generate{" "}
            <sup className="border rounded-full p-0.5 text-[10px]">AI</sup>
          </button>
        </div>
      </div>
      <div className="relative">
        <p>Phone Number</p>
        <div className=" absolute z-10 top-6 left-3 h-[45px] flex items-center ">
          +91
        </div>

        <input
          className="w-[100%] z-0 border-2 rounded-lg h-[45px] pl-10 "
          type="number"
          value={personalDetails.phoneNumber}
          onChange={(e) => {
            setPersonalDetails({
              ...personalDetails,
              phoneNumber: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <p>Email</p>
        <input
          className="w-[100%] border-2 rounded-lg h-[45px] p-2"
          type="email"
          value={personalDetails.email}
        />
      </div>
      <div>
        <p>Linkedin</p>
        <input
          className="w-[100%] border-2 rounded-lg h-[45px] p-2"
          value={personalDetails.linkedIn}
          type="text"
          onChange={(e) => {
            setPersonalDetails({
              ...personalDetails,
              linkedIn: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <p>Github</p>
        <input
          className="w-[100%] border-2 rounded-lg h-[45px] p-2"
          type="text"
          value={personalDetails.github}
          onChange={(e) => {
            setPersonalDetails({
              ...personalDetails,
              github: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <p>Location</p>
        <input
          className="w-[100%] border-2 rounded-lg h-[45px] p-2"
          type="text"
          value={personalDetails.location}
          onChange={(e) => {
            setPersonalDetails({
              ...personalDetails,
              location: e.target.value,
            });
          }}
        />
      </div>
      <div className=" border-3 p-2 mt-5 flex place-content-end">
        <Button
          isDisabled={
            personalDetails.fullName === "" ||
            personalDetails.email === "" ||
            personalDetails.phoneNumber === "" ||
            personalDetails.linkedIn === "" ||
            personalDetails.github === "" ||
            personalDetails.location === ""
          }
          bg={"#3F83F8"}
          color={"white"}
          _hover={{ bg: "blue" }}
          onClick={handleSubmit}
        >
          {loading ? "Saving..." : "Continue"}
        </Button>
      </div>
      <GenerateModal onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default PersonalDetails;
