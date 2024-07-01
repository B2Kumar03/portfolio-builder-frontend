import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import axios from "axios"

export function LoginModal({ isOpen, onOpen, onClose }) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const [loginData, setLogData] = useState({
    email: "",
    password: "",
  });
 function notification(){
  toast({
    title: "Login Successful",
    description: "Welcome to your dashboard",
    status: "success",
    duration: 5000,
    isClosable: true,
  });
}
  function notification1() {
    toast({
      title: "Invalid credential",
      description: "Please check your email or password",
      status: "error", // Changed from "success" to "error"
      duration: 5000,
      isClosable: true,
    });
  }

  
  
  async function userLogin(){
    console.log("object");
    
    try {
      const {data}=await axios.post("http://localhost:8080/api/v1/users/login",loginData)
      if(!data.success){
        notification1()
      }
      localStorage.setItem("token",JSON.stringify(data.token))
      notification()
      onClose()
    } catch (error) {
      console.log(error);
    }

  }





  return (
    <>
      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center mt-10">User Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter email"
                type="email"
                value={loginData.email}
                onChange={(e)=>{
                  setLogData({...loginData, email: e.target.value });
                }}
               
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Enter password"
                type="password"
                value={loginData.password}
                onChange={(e)=>{
                  setLogData({...loginData, password: e.target.value });
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={userLogin}>
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
