import { asyncHandler } from "../utils/asynchandler.js";
// import Skill from "../models/skills.model.js"
import Skills from "../models/skills.model.js";

const skillsController = asyncHandler(async (req, res) => {
  const { skills,email } = req.body;
  
  if (!skills) {
    return res.status(400).json({ message: "Please provide skills" });
  }
  const r = await Skills.create({ skills,email });
  if(!r){
    return res.status(400).json({ message: "Failed to create skills" });
  }
  res.json({ message: "Skills created successfully" });
});

export default skillsController
