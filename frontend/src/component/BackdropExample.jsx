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
  Image,
  HStack,
  PinInput,
  PinInputField,
  Text,
  Center,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { otpAuth } from "../redux/OTP/actionCreator";
import axios from "axios";

function BackdropExample({ isOpen, onOpen, onClose }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.OTP);
  const state1 = useSelector((state) => state.signIn);
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [timeLeft, setTimeLeft] = useState(60);
  const [userOTP, setUserOTP] = useState("");
  useEffect(() => {
    let timer;
    if (isOpen) {
      setTimeLeft(60); // Reset time on open
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  async function otpMatcher() {
    console.log(userOTP);
    if (userOTP==state.otp) {
      const formData = new FormData();
      formData.append("avtar", state1.data.avtar);
      formData.append("userName", state1.data.userName);
      formData.append("email", state1.data.email);
      formData.append("password", state1.data.password);
      console.log(state1.data.avtar);
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/users/register",
        formData,
        {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
        }
      );
      onClose();
      if (!data.success) {
        alert(data.message);
        return;
      }
      alert(data.message);
      onClose();
    } else {
      alert("Wrong OTP");
      setUserOTP("");
      setTimeLeft(60);
      onClose();
    }
  }

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent className="p-10">
          <ModalHeader>
            <Center>
              <Image src="https://i5.walmartimages.com/dfw/63fd9f59-7d8b/f36f4f89-5684-4c50-8780-e1ee1bef1870/v1/hand-holding-phone-blue-bubble.svg" />
            </Center>
            <Text className="text-center font-bold" textAlign="center">
              Enter verification code
            </Text>
            <Text textAlign="center" className="text-[15px] text-[#ccc]">
              Please enter the 6 digit verification code <br />
              we sent to you
            </Text>
            <Text textAlign="center" className="text-[18px] text-[#ccc] mt-2">
              Time remaining: {timeLeft}s
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <HStack>
                <PinInput type="alphanumeric">
                  <PinInputField
                    onChange={(e) =>
                      setUserOTP((prev) => prev + e.target.value)
                    }
                  />
                  <PinInputField
                    onChange={(e) =>
                      setUserOTP((prev) => prev + e.target.value)
                    }
                  />
                  <PinInputField
                    onChange={(e) =>
                      setUserOTP((prev) => prev + e.target.value)
                    }
                  />
                  <PinInputField
                    onChange={(e) =>
                      setUserOTP((prev) => prev + e.target.value)
                    }
                  />
                  <PinInputField
                    onChange={(e) =>
                      setUserOTP((prev) => prev + e.target.value)
                    }
                  />
                  <PinInputField
                    onChange={(e) =>
                      setUserOTP((prev) => prev + e.target.value)
                    }
                  />
                </PinInput>
              </HStack>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button onClick={otpMatcher} className="w-[100%]">
              Verify code
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BackdropExample;
