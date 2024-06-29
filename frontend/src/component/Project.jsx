import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { MdOutlineCloudDone } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
const Projects = () => {
  return (
    <div className="border bg-[white] p-10 rounded-lg grid gap-5 grid-cols-1">
      <div>
        <div className="font-bold text-[18px] flex gap-2 items-center">
          <div className="text-[#3F83F8]">Projects</div>
          <div className="text-[15px] font-medium text-[#ccc] ">Saved</div>
          <div className="text-[15px]">
            <MdOutlineCloudDone />
          </div>
        </div>
      </div>

      <Accordion allowToggle outline={"none"} className="border rounded-md"> 
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Project 1
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <div className=" border-3 p-2 mt-5 flex place-content-end">
        <button className="bg-[#3F83F8] border-3 p-4 mt-5 place-content-end tex-[20px] font-bold text-[white] rounded-lg">
          Continue
        </button>
      </div>
    </div>
  );
};

export default Projects;
