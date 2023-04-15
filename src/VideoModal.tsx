import React, { useState } from "react";
import { AxiosError } from "axios";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// Define an interface for the props of the VideoPlayer component
interface VideoPlayerProps {
  videoindex: number; // The videoindex prop is a number
}

const VideoModal = (props: VideoPlayerProps) => {
  // Get the videoindex prop from the props object
  const videoindex = props.videoindex;

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  // Add a state variable to store the error message
  const [error, setError] = useState("");

  const handleOpen = () => setIsOpen(true);
  const handleCancel = () => setIsOpen(false);
  // const handleOk = () => setIsOpen(false);
  const handleToggle = () => setShowPassword(!showPassword);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleOk = async () => {
    // Fetch the vercel function URL
    try {
      const response = await fetch(
        `/api/redirect?password=${password}&index=${videoindex}`
      );
      // Check if the response is ok
      if (response.ok) {
        // Get the website link from the response
        // const data = await response.json()
        const link = await response.text();
        // Go to the website link
        navigate(`../video?url=${link}`);
        setIsOpen(false);
      } else {
        // Throw an error with the status text
        throw new Error(response.statusText);
      }
    } catch (err: unknown) {
      setError("Invalid Password Attempt"); // Now TypeScript knows that error has a message property
    }
  };

  return (
    <>
      <Button variant="solid" colorScheme="blue" onClick={handleOpen}>
        Open Video
      </Button>

      <Modal isOpen={isOpen} onClose={handleCancel}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter your password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={handleChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleToggle}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {error && <p>{error}</p>}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button colorScheme="blue" mr={3} onClick={handleOk}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VideoModal;