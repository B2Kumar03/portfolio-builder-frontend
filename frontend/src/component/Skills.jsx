import React, { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { MdOutlineCloudDone } from "react-icons/md";
import { update_skill } from "../redux/isFilled/actionCreator";

const techStackIcons = {
  HTML: "https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg",
  CSS: "https://www.vectorlogo.zone/logos/w3_css/w3_css-icon.svg",
  JavaScript: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
  TypeScript: "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg",
  MongoDB: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg",
  Express: "https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg",
  React: "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",
  Node: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg",
  Angular: "https://www.vectorlogo.zone/logos/angular/angular-icon.svg",
  Vue: "https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg",
  Next: "https://raw.githubusercontent.com/B2Kumar03/-1Nextjs-application/68ac048593c6fc3d13c22c744741d7d7df07e492/public/next.svg",
  Bootstrap: "https://www.vectorlogo.zone/logos/getbootstrap/getbootstrap-icon.svg",
  Tailwind: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
  Sass: "https://www.vectorlogo.zone/logos/sass-lang/sass-lang-icon.svg",
  jQuery: "https://www.vectorlogo.zone/logos/jquery/jquery-icon.svg",
  Redux: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg",
  GraphQL: "https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg",
  Apollo: "https://www.vectorlogo.zone/logos/apollographql/apollographql-icon.svg",
  Firebase: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
  AWS: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
  Docker: "https://www.vectorlogo.zone/logos/docker/docker-icon.svg",
  Git: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
  Webpack: "https://webpack.js.org/site-logo.c0e60df418e04f58.svg",
  Babel: "https://www.vectorlogo.zone/logos/babeljs/babeljs-icon.svg",
  ESLint: "https://www.vectorlogo.zone/logos/eslint/eslint-icon.svg",
  Jest: "https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg",
  Mocha: "https://www.vectorlogo.zone/logos/mochajs/mochajs-icon.svg",
  Cypress: "https://www.cypress.io/_astro/navbar-brand.D87396b0.svg",
  Postman: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
};

const Skills = () => {
  const state = useSelector((state) => state.signIn);
  const toast = useToast();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Frontend");
  const [loading,setLoading]=useState(false)
  const state1=useSelector((state)=>state.isFilled)
  const dispatch=useDispatch()

  useEffect(() => {
    const fetchSkills = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const { data } = await axios.get("https://porifolio-builder-backend-1.onrender.com/api/v1/users/get-skill", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(data){
          dispatch(update_skill())
        }
        setSelectedSkills(data.skills.skillsName);
        
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch skills",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    };

    fetchSkills();
  }, []);

  const handleCheckboxChange = (e) => {
    const skill = e.target.value;
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const handleSubmit = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const skillsUrl = selectedSkills.map((skill) => techStackIcons[skill]);
    
      setLoading((prev)=>!prev)
    try {
      await axios.post(
        "https://porifolio-builder-backend-1.onrender.com/api/v1/users/skills",
        {
          skillsUrl,
          skillsName: selectedSkills,
          role:selectedCategory
          
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("skill", "true");
      setLoading((prev)=>!prev)
      toast({
        title: "Skills saved successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      setLoading((prev)=>!prev)
      toast({
        title: "Error",
        description: "Failed to save skills",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <div className="border p-10 rounded-lg grid gap-5 grid-cols-1">
      <div>
        <div className="font-bold text-[18px] flex gap-2 items-center">
          <div className="text-[#3F83F8]">Personal Details</div>
          <div className="text-[15px] font-medium text-[#ccc]">Saved</div>
          <div className="text-[15px]">
            <MdOutlineCloudDone />
          </div>
        </div>
      </div>
      <div className="border p-5 rounded">
        <label htmlFor="">Select Role :</label>
        <select
          
          className="border p-2 rounded-lg ml-5 max-w-[1000px]"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="MERN">MERN</option>
        </select>
      </div>
      <div>
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(techStackIcons).map((tech) => (
            <div key={tech} className="flex items-center">
              <input
                type="checkbox"
                value={tech}
                onChange={handleCheckboxChange}
                checked={selectedSkills.includes(tech)}
              />
              <img src={techStackIcons[tech]} alt={tech} className="w-6 h-6 ml-2" />
              <label className="ml-2">{tech}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-lg font-bold">Selected Skills</h3>
        <div className="flex gap-2 mt-2">
          {selectedSkills.map((skill) => (
            <div className="border rounded-md p-5">
              <img key={skill} src={techStackIcons[skill]} alt={skill} className="w-8 h-8" />
              <p>{skill}</p>
            </div>
            
          ))}
        </div>
      </div>
      <div className="border-3 p-2 mt-5 flex place-content-end">
        <button
          onClick={handleSubmit}
          className="bg-[#3F83F8] border-3 p-4 mt-5 tex-[20px] font-bold text-[white] rounded-lg"
        >
          {loading?"Saving...":"Save Skills"}
        </button>
      </div>
    </div>
  );
};

export default Skills;
