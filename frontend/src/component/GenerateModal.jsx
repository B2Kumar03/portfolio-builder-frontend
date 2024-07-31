import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Select,
  Checkbox,
  RadioGroup,
  Tooltip,
  Textarea,
  Box,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useState, useRef } from "react";
import copyToClipboard from "react-copy-to-clipboard"
export function GenerateModal({ onOpen, isOpen, onClose }) {
  const [skills, setSkills] = useState([]);
  const stateSign = useSelector((state) => state.signIn);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const toast = useToast();
  const [generate, setGenerate] = useState({
    name: stateSign.data.user.userName,
    degree: "",
    status: "",
    skills: [],
    experience: 0,
  });
  
  
  async function generateDetails() {
    setLoading((prev) => !prev);
    try {
      const { data } = await axios.post(
        "https://porifolio-builder-backend-1.onrender.com/api/v1/users/generate-details",
        generate
      );
      setText(data.message);
      setLoading((prev) => !prev);
      onClose();
      onOpen();
    } catch (error) {
      showErrorNotification();
      setLoading((prev) => !prev);
      console.error(error);
    }
  }
  const showErrorNotification = () => {
    toast({
      title: "Something went wrong ",
      description: "Error occurs while generating...",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const handleCheckboxChange = (e) => {
    const skill = e.target.value;
    if (e.target.checked) {
      setSkills([...skills, skill]);
    } else {
      setSkills(skills.filter((skillItem) => skillItem !== skill));
    }
    setGenerate({ ...generate, skills: skills });
  };

  const [copySuccess, setCopySuccess] = useState(false);
  const textareaRef = useRef(null);
  if (text != "") {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generate Summary</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box position="relative" width="100%">
              <Textarea
                ref={textareaRef}
                isDisabled
                placeholder="Here is a sample placeholder"
                size="md"
                resize="vertical"
                minHeight="200px"
                borderWidth="1px"
                borderRadius="md"
                padding={5}
                _disabled={{ backgroundColor: "white" }}
                value={text}
              />
              <Tooltip
                isOpen={copySuccess}
                label="Copied!"
                placement="top"
                hasArrow
              >
                <Button
                  position="absolute"
                  top="4px"
                  right="4px"
                  size="sm"
                  onClick={async()=>{
                    await navigator.clipboard.writeText(text)
                    setCopySuccess(true)
                  }}
                >
                  Copy
                </Button>
              </Tooltip>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={()=>{
              setText("")
              onClose()
              onClose()
            }}>
              Close
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generate Summary</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Education
            <Select
              id="education"
              onChange={(e) => {
                setGenerate({ ...generate, degree: e.target.value });
              }}
            >
              <option value="select_education">Selection education</option>

              <option value="higher_secondary">
                Higher Secondary Education (Class 12)
              </option>
              <option value="ba">Bachelor of Arts (BA)</option>
              <option value="bsc">Bachelor of Science (BSc)</option>
              <option value="bcom">Bachelor of Commerce (BCom)</option>
              <option value="btech">Bachelor of Technology (BTech)</option>
              <option value="be">Bachelor of Engineering (BE)</option>
              <option value="bca">
                Bachelor of Computer Applications (BCA)
              </option>
              <option value="bba">
                Bachelor of Business Administration (BBA)
              </option>
              <option value="barch">Bachelor of Architecture (BArch)</option>
              <option value="bpharm">Bachelor of Pharmacy (BPharm)</option>
              <option value="bdes">Bachelor of Design (BDes)</option>
              <option value="bfa">Bachelor of Fine Arts (BFA)</option>
              <option value="bhm">Bachelor of Hotel Management (BHM)</option>
              <option value="llb">Bachelor of Laws (LLB)</option>
              <option value="ma">Master of Arts (MA)</option>
              <option value="msc">Master of Science (MSc)</option>
              <option value="mcom">Master of Commerce (MCom)</option>
              <option value="mtech">Master of Technology (MTech)</option>
              <option value="me">Master of Engineering (ME)</option>
              <option value="mca">Master of Computer Applications (MCA)</option>
              <option value="mba">
                Master of Business Administration (MBA)
              </option>
              <option value="march">Master of Architecture (MArch)</option>
              <option value="mpharm">Master of Pharmacy (MPharm)</option>
              <option value="mdes">Master of Design (MDes)</option>
              <option value="mfa">Master of Fine Arts (MFA)</option>
              <option value="llm">Master of Laws (LLM)</option>
              <option value="ca">Chartered Accountancy (CA)</option>
              <option value="cs">Company Secretary (CS)</option>
              <option value="cma">Cost and Management Accountancy (CMA)</option>
              <option value="actuarial">Actuarial Science</option>
              <option value="mbbs">
                Bachelor of Medicine, Bachelor of Surgery (MBBS)
              </option>
              <option value="bds">Bachelor of Dental Surgery (BDS)</option>
              <option value="pharmd">Doctor of Pharmacy (PharmD)</option>
              <option value="bscnursing">
                Bachelor of Science in Nursing (BSc Nursing)
              </option>
              <option value="diploma_engineering">
                Diploma in Engineering
              </option>
              <option value="diploma_education">
                Diploma in Education (DEd)
              </option>
              <option value="diploma_pharmacy">
                Diploma in Pharmacy (DPharm)
              </option>
              <option value="diploma_nursing">Diploma in Nursing</option>
              <option value="certificate_courses">Certificate Courses</option>
            </Select>
            <Checkbox
              colorScheme="green"
              onChange={(e) => {
                setGenerate({
                  ...generate,
                  status: e.target.checked ? "Completed" : "Pursuing",
                });
              }}
            >
              Completed
            </Checkbox>
            <br />
            <br />
            Select role
            <Select id="mern_stack">
              <option value="frontend">Front End</option>
              <option value="backend">Back End (Node.js and Express)</option>
              <option value="database">Database (MongoDB)</option>
              <option value="fullstack">Full Stack (MERN)</option>
            </Select>
            <RadioGroup className="grid grid-cols-3 gap-4">
              <Checkbox
                colorScheme="green"
                value="HTML"
                isChecked={skills.includes("HTML")}
                onChange={handleCheckboxChange}
              >
                HTML
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="CSS"
                isChecked={skills.includes("CSS")}
                onChange={handleCheckboxChange}
              >
                CSS
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="JavaScript"
                onChange={handleCheckboxChange}
              >
                JavaScript
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="TypeScript"
                onChange={handleCheckboxChange}
              >
                TypeScript
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="MongoDB"
                onChange={handleCheckboxChange}
              >
                MongoDB
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="Express.js"
                onChange={handleCheckboxChange}
              >
                Express.js
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="React.js"
                onChange={handleCheckboxChange}
              >
                React.js
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="Node.js"
                onChange={handleCheckboxChange}
              >
                Node.js
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="Angular"
                onChange={handleCheckboxChange}
              >
                Angular
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="Vue.js"
                onChange={handleCheckboxChange}
              >
                Vue.js
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="Next.js"
                onChange={handleCheckboxChange}
              >
                Next.js
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="Bootstrap"
                onChange={handleCheckboxChange}
              >
                Bootstrap
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="Tailwind CSS"
                onChange={handleCheckboxChange}
              >
                Tailwind CSS
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="Sass/SCSS"
                onChange={handleCheckboxChange}
              >
                Sass/SCSS
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="jQuery"
                onChange={handleCheckboxChange}
              >
                jQuery
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="Redux"
                onChange={handleCheckboxChange}
              >
                Redux
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="GraphQL"
                onChange={handleCheckboxChange}
              >
                GraphQL
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="Apollo"
                onChange={handleCheckboxChange}
              >
                Apollo
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="Firebase"
                onChange={handleCheckboxChange}
              >
                Firebase
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="AWS"
                onChange={handleCheckboxChange}
              >
                AWS
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="Docker"
                onChange={handleCheckboxChange}
              >
                Docker
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="Git"
                onChange={handleCheckboxChange}
              >
                Git
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="Webpack"
                onChange={handleCheckboxChange}
              >
                Webpack
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="Babel"
                onChange={handleCheckboxChange}
              >
                Babel
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="ESLint"
                onChange={handleCheckboxChange}
              >
                ESLint
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="Jest"
                onChange={handleCheckboxChange}
              >
                Jest
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="Mocha"
                onChange={handleCheckboxChange}
              >
                Mocha
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="Cypress"
                onChange={handleCheckboxChange}
              >
                Cypress
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="REST APIs"
                onChange={handleCheckboxChange}
              >
                REST APIs
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="Microservices"
                onChange={handleCheckboxChange}
              >
                Microservices
              </Checkbox>
            </RadioGroup>
            <br />
            Experience
            <Select
              onChange={(e) =>
                setGenerate({ ...generate, experience: e.target.value })
              }
            >
              <option value={0}>0 Year</option>
              <option value={1}>1 Year</option>
              <option value={2}>2 Years</option>
              <option value={3}>3 Years</option>
              <option value={4}>4 Years</option>
              <option value={5}>5 Years</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="ghost" onClick={generateDetails}>
              {!isLoading ? "Generate" : "Generating..."}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
