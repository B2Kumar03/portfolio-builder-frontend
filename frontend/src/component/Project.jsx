import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  RadioGroup,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineCloudDone } from "react-icons/md";
import { useSelector } from "react-redux";

const Projects = () => {
  const state = useSelector((state) => state.signIn);
  const toast = useToast();
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [getProject, setGetProject] = useState([]);
  const [update,setUdate]=useState(false)
  const [projectDat, setProjectDat] = useState({
    userId: state.data.user.email,
    projectTitle: "",
    projectDescription: "",
    demoLink: "",
    githubLink: "",
    projectImage: null,
    techstack: [],
  });

  async function fetchProject() {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/users/get-project",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setGetProject(data.data);
      console.log(getProject);
    } catch (error) {
      console.log("project", error);
    }
  }

  useEffect(() => {
    fetchProject();
  }, [update]);

  const showSuccessNotification = () => {
    toast({
      title: "Project details saved successfully",
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

  const handleCheckboxChange = (e) => {
    const skill = e.target.value;
    if (e.target.checked) {
      setSkills((prevSkills) => [...prevSkills, skill]);
    } else {
      setSkills((prevSkills) =>
        prevSkills.filter((skillItem) => skillItem !== skill)
      );
    }
    setProjectDat((prevData) => ({
      ...prevData,
      techstack: [...skills, skill],
    }));
  };

  const handleCheckboxChange1 = (e, _id) => {
    setGetProject((prevProjects) => {
      return prevProjects.map((item) => {
        if (item._id === _id) {
          if (item.techstack.includes(e)) {
            item.techstack = item.techstack.filter((tech) => tech !== e);
          } else {
            item.techstack.push(e);
          }
        }
        return item;
      });
    });
    console.log(getProject);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit data", projectDat);
    const formData = new FormData();
    formData.append("userId", state.data.user.email);
    formData.append("projectTitle", projectDat.projectTitle);
    formData.append("projectDescription", projectDat.projectDescription);
    formData.append("demoLink", projectDat.demoLink);
    formData.append("githubLink", projectDat.githubLink);
    formData.append("projectImage", projectDat.projectImage);
    formData.append("techstack", projectDat.techstack);

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/users/project",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUdate((prev)=>!prev)
      showSuccessNotification();
    } catch (error) {
      console.log(error);
      showErrorNotification();
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e, projectId) => {
    e.preventDefault();
    console.log("Update data", projectId);
    const updatedData = getProject.find((project) => project._id === projectId);
    if (!updatedData) return;

    setLoading(true);
    console.log(projectId);
    try {
      const { data } = await axios.patch(
        `http://localhost:8080/api/v1/users/update-project/${projectId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      showSuccessNotification();
    } catch (error) {
      console.log(error);
      showErrorNotification();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="font-bold text-[18px] flex gap-2 items-center">
        <div className="text-[#3F83F8]">Projects</div>
        <div className="text-[15px] font-medium text-[#ccc]">Saved</div>
        <div className="text-[15px]">
          <MdOutlineCloudDone />
        </div>
      </div>

      {projectData.map((project, index) => (
        <div
          key={project + 1}
          className="bg-[white] p-2 rounded-lg grid gap-1 grid-cols-1"
        >
          <Accordion
            allowToggle
            outline={"none"}
            className="border rounded-md duration-1000"
          >
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {`Project ${project + 1}`}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div>
                  <label>Project title</label>
                  <input
                    type="text"
                    className="w-[100%] border-2 rounded-lg h-[45px] p-2"
                    value={projectDat.projectTitle}
                    onChange={(e) =>
                      setProjectDat({
                        ...projectDat,
                        projectTitle: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label>Project description</label>
                  <textarea
                    className="w-[100%] border-2 rounded-lg h-[170px] p-5"
                    value={projectDat.projectDescription}
                    onChange={(e) =>
                      setProjectDat({
                        ...projectDat,
                        projectDescription: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mt-3">
                  <label>Project deployed link</label>
                  <input
                    type="url"
                    placeholder="https://app.com"
                    className="w-[100%] border-2 rounded-lg h-[45px] p-2"
                    value={projectDat.demoLink}
                    onChange={(e) =>
                      setProjectDat({ ...projectDat, demoLink: e.target.value })
                    }
                  />
                </div>

                <div className="mt-3">
                  <label>Project GitHub link</label>
                  <input
                    type="url"
                    placeholder="http://githubid/projectrepo"
                    className="w-[100%] border-2 rounded-lg h-[45px] p-2"
                    value={projectDat.githubLink}
                    onChange={(e) =>
                      setProjectDat({
                        ...projectDat,
                        githubLink: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mt-3">
                  <label>Choose an image of your project</label>
                  <input
                    type="file"
                    className="w-[100%] border-2 rounded-lg h-[45px] p-2"
                    onChange={(e) =>
                      setProjectDat({
                        ...projectDat,
                        projectImage: e.target.files[0],
                      })
                    }
                  />
                </div>

                <div className="mt-5">
                  <label className="text-[#555ee7]">Tech stack</label>
                  <RadioGroup className="grid grid-cols-3 mt-4 gap-4">
                    {[
                      "HTML",
                      "CSS",
                      "JavaScript",
                      "TypeScript",
                      "MongoDB",
                      "Express.js",
                      "React.js",
                      "Node.js",
                      "Angular",
                      "Vue.js",
                      "Next.js",
                      "Bootstrap",
                      "Tailwind CSS",
                      "Sass/SCSS",
                      "jQuery",
                      "Redux",
                      "GraphQL",
                      "Apollo",
                      "Firebase",
                      "AWS",
                      "Docker",
                      "Git",
                      "Webpack",
                      "Babel",
                      "ESLint",
                      "Jest",
                      "Mocha",
                      "Cypress",
                      "REST APIs",
                      "Microservices",
                    ].map((tech, idx) => (
                      <Checkbox
                        key={idx}
                        colorScheme="green"
                        value={tech}
                        isChecked={skills.includes(tech)}
                        onChange={handleCheckboxChange}
                      >
                        {tech}
                      </Checkbox>
                    ))}
                  </RadioGroup>
                </div>

                <div className="flex justify-end duration-700">
                  <button
                    className="border p-2 bg-[#3F83F8] text-[white] font-bold mt-5 rounded-md hover:bg-[white] duration-700 hover:text-[black]"
                    onClick={handleSubmit}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      ))}

      {getProject.map((project, index) => (
        <div
          key={index}
          className="bg-[white] p-2 rounded-lg grid gap-1 grid-cols-1"
        >
          <Accordion
            allowToggle
            outline={"none"}
            className="border rounded-md duration-1000"
          >
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {`Project ${index + 1}`}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div>
                  <label>Project title</label>
                  <input
                    type="text"
                    className="w-[100%] border-2 rounded-lg h-[45px] p-2"
                    value={project.projectTitle}
                    onChange={(e) =>
                      setGetProject((prevProjects) =>
                        prevProjects.map((p) =>
                          p._id === project._id
                            ? { ...p, projectTitle: e.target.value }
                            : p
                        )
                      )
                    }
                  />
                </div>

                <div>
                  <label>Project description</label>
                  <textarea
                    className="w-[100%] border-2 rounded-lg h-[170px] p-5"
                    value={project.projectDescription}
                    onChange={(e) =>
                      setGetProject((prevProjects) =>
                        prevProjects.map((p) =>
                          p._id === project._id
                            ? { ...p, projectDescription: e.target.value }
                            : p
                        )
                      )
                    }
                  />
                </div>

                <div className="mt-3">
                  <label>Project deployed link</label>
                  <input
                    type="url"
                    placeholder="https://app.com"
                    className="w-[100%] border-2 rounded-lg h-[45px] p-2"
                    value={project.demoLink}
                    onChange={(e) =>
                      setGetProject((prevProjects) =>
                        prevProjects.map((p) =>
                          p._id === project._id
                            ? { ...p, demoLink: e.target.value }
                            : p
                        )
                      )
                    }
                  />
                </div>

                <div className="mt-3">
                  <label>Project GitHub link</label>
                  <input
                    type="url"
                    placeholder="http://githubid/projectrepo"
                    className="w-[100%] border-2 rounded-lg h-[45px] p-2"
                    value={project.githubLink}
                    onChange={(e) =>
                      setGetProject((prevProjects) =>
                        prevProjects.map((p) =>
                          p._id === project._id
                            ? { ...p, githubLink: e.target.value }
                            : p
                        )
                      )
                    }
                  />
                </div>

                <div className="mt-3">
                  <label>Choose an image of your project</label>
                  <img
                    src={project.projectImage}
                    width={50}
                    height={50}
                    alt="Project"
                  />
                  <button>Update</button>
                </div>

                <div className="mt-5">
                  <label className="text-[#555ee7]">Tech stack</label>
                  <RadioGroup className="grid grid-cols-3 mt-4 gap-4">
                    {[
                      "HTML",
                      "CSS",
                      "JavaScript",
                      "TypeScript",
                      "MongoDB",
                      "Express.js",
                      "React.js",
                      "Node.js",
                      "Angular",
                      "Vue.js",
                      "Next.js",
                      "Bootstrap",
                      "Tailwind CSS",
                      "Sass/SCSS",
                      "jQuery",
                      "Redux",
                      "GraphQL",
                      "Apollo",
                      "Firebase",
                      "AWS",
                      "Docker",
                      "Git",
                      "Webpack",
                      "Babel",
                      "ESLint",
                      "Jest",
                      "Mocha",
                      "Cypress",
                      "REST APIs",
                      "Microservices",
                    ].map((tech, idx) => (
                      <Checkbox
                        key={idx}
                        colorScheme="green"
                        value={tech}
                        isChecked={project.techstack.includes(tech)}
                        onChange={(e) =>
                          handleCheckboxChange1(e.target.value, project._id)
                        }
                      >
                        {tech}
                      </Checkbox>
                    ))}
                  </RadioGroup>
                </div>

                <div className="flex justify-end duration-700">
                  <button
                    className="border p-2 bg-[#3F83F8] text-[white] font-bold mt-5 rounded-md hover:bg-[white] duration-700 hover:text-[black]"
                    onClick={(e) => handleUpdate(e, project._id)}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
      <input
        type="button"
        value="Add a new project"
        onClick={() => {
          if (projectData.length === 1) {
            alert(`First save the project ${projectData[0] + 1}`);
          }
          setProjectData([getProject.length]);
        }}
        className="w-[100%] mt-[50px] cursor-pointer border-2 rounded-lg h-[45px] p-2 text-[#3F83F8]"
      />
      <div className="border-3 p-2 mt-5 flex place-content-end">
        <button className="bg-[#3F83F8] border-3 p-4 mt-5 tex-[20px] font-bold text-[white] rounded-lg">
          Continue
        </button>
      </div>
    </>
  );
};

export default Projects;
