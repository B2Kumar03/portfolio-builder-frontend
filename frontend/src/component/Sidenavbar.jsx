import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { GiSkills } from "react-icons/gi";
import { Link } from "react-router-dom";
import { GoUpload } from "react-icons/go";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const Sidenavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const stateSign = useSelector((state) => state.signIn);
  const fullName = stateSign.data.user.userName;
  const id = stateSign.data.user._id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [endP, setEndP] = useState("");

  function valiDate() {
    const project = localStorage.getItem("project") === "true";
    const resume = localStorage.getItem("resume") === "true";
    const skill = localStorage.getItem("skill") === "true";
    const personal_details =
      localStorage.getItem("personal_details") === "true";

    if (project && resume && skill && personal_details) {
      const nameParts = fullName.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join("-") : "";
      const constructedId = id
        ? `${firstName}-${lastName}+${id}`
        : `${firstName}-${id}`;
      const endpoint = `https://porifolio-builder-backend-1.onrender.com/${constructedId}`;
      setEndP(endpoint);
      onOpen();
    } else {
      if (!project) {
        toast.error("Project is not filled.");
      } else {
        toast.success("Project is filled.");
      }

      if (!resume) {
        toast.error("Resume is not filled.");
      } else {
        toast.success("Resume is filled.");
      }

      if (!skill) {
        toast.error("Skill is not filled.");
      } else {
        toast.success("Skill is filled.");
      }

      if (!personal_details) {
        toast.error("Personal details are not filled.");
      } else {
        toast.success("Personal details are filled.");
      }
    }
  }

  function handleOpenLink() {
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join("-") : "";
    const constructedId = id
      ? `${firstName}-${lastName}+${id}`
      : `${firstName}-${id}`;
    const endpoint = `https://porifolio-builder-backend-1.onrender.com/${constructedId}`;
    window.open(endpoint, "_blank");
    setIsModalOpen(false);
    onClose()
  }

  return (
    <div className="max-auto grid grid-cols-1 border p-[40px] gap-[30px] text-[20px] bg-[white] rounded-xl">
      <Link to="/">
        <div className="flex gap-2 items-center hover:drop-shadow-2xl hover:cursor-pointer hover:bg-[#ccc] p-[15px] border rounded-md duration-700 ">
          <div className="border rounded-full p-[10px] ">
            <FaRegUser />
          </div>
          <div className="font-bold">Personal Details</div>
        </div>
      </Link>

      <Link to="/project">
        <div className="flex gap-2 items-center hover:drop-shadow-2xl border hover:cursor-pointer hover:bg-[#ccc] p-[15px] rounded-md duration-700">
          <div className="border rounded-full p-[10px] bg-[#46B8BC]">
            <GoProjectSymlink />
          </div>
          <div className="font-bold">Project</div>
        </div>
      </Link>

      <Link to="/skills">
        <div className="flex gap-2 items-center hover:drop-shadow-2xl hover:cursor-pointer hover:bg-[#ccc] p-[15px] border rounded-md duration-700">
          <div className="border rounded-full p-[10px] bg-[#CC926E]">
            <GiSkills />
          </div>
          <div className="font-bold">Skills</div>
        </div>
      </Link>

      <Link to="/upload-resume">
        <div className="flex gap-2 items-center hover:drop-shadow-2xl hover:cursor-pointer hover:bg-[#ccc] p-[15px] border rounded-md duration-700">
          <div className="rounded-full p-[10px] bg-[#5992e8]">
            <GoUpload />
          </div>
          <div className="font-bold">Upload Resume</div>
        </div>
      </Link>

      <div>
        <button
          className="border p-2 hover:bg-[#548ced] bg-[#075df0] mt-20 text-[white] font-semibold rounded-md text-[20px] hover:shadow-xl duration-300"
          onClick={valiDate}
        >
          Generate Portfolio
        </button>
      </div>

      <div className="mt-[100px]"></div>
      <ToastContainer />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-green-500">
            Your portfolio Live
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="border p-5 m-4">
            <a href={endP} target="_blank">{endP}</a>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleOpenLink}>
              Open portfolio
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Sidenavbar;
