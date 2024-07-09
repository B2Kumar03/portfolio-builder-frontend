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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { addData } from "../redux/SignInData/actionCreator";
import { loading } from "../redux/Loading/actionCreator";
import { useNavigate } from 'react-router-dom';
import { updataAuth } from "../redux/auth/actionCreator";

export function LoginModal({ isOpen, onClose }) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const loadingState = useSelector((state) => state.loading);
  const navigate = useNavigate();

  const showSuccessNotification = () => {
    toast({
      title: "Login Successful",
      description: "Welcome to your dashboard",
      status: "success",
      duration: 5000,
      isClosable: true,
      position:"top-right"
    });
  };

  const showErrorNotification = () => {
    toast({
      title: "Invalid Credential",
      description: "Please check your email or password",
      status: "error",
      duration: 5000,
      isClosable: true,
      position:"top-right"
    });
  };

  const handleUserLogin = async () => {
    dispatch(loading());
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        loginData
      );

      if (!data.success) {
        showErrorNotification();
        dispatch(loading());
        return;
      }

      localStorage.setItem("token", JSON.stringify(data.token));
      showSuccessNotification();
      dispatch(updataAuth(data.token));

      const token = JSON.parse(localStorage.getItem("token"));
      const userData = await axios.get("http://localhost:8080/api/v1/users/getuser", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      dispatch(addData(userData.data));
      dispatch(loading());
      navigate("/");
      onClose();
    } catch (error) {
      dispatch(loading());
      showErrorNotification();
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
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
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Enter password"
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleUserLogin}>
            {!loadingState.isLoading ? "Login" : "Loading..."}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
