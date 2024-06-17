import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    projectTitle: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    projectImage: {
        type:String,
        required:true
    },
    email:{
      type:String,
      required:true
    },
    techstack:[]
  },
  { timestamps: true }
);

const Project=mongoose.model("Project",projectSchema)

export default Project
