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
  } from '@chakra-ui/react'
  import { useRef } from 'react'
  import { useToast } from '@chakra-ui/react'
  
  export function LoginModal({ isOpen, onOpen, onClose }) {
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const toast = useToast()
  
    return (
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className='text-center mt-10'>User Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input ref={initialRef} placeholder='Enter email' type="email" />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input placeholder='Enter password' type="password" />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} >
                Login
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  