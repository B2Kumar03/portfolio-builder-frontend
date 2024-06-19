import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    email:{
      type:String,
      required:true,
      trime:true
    },
    skills: [],
  },
  { timestamps: true }
);



const Skills=mongoose.model("Skills",skillsSchema)

export default Skills
