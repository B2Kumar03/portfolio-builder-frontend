import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trime: true,
    },
    demoLink: {
      type: String,
      required: true,
      trime: true,
    },
    githubLink: {
      type: String,
      required: true,
      trime: true,
    },
    projectTitle: {
      type: String,
      required: true,
      trime: true,
    },
    projectDescription: {
      type: String,
      required: true,
      trime: true,
    },
    projectImage: {
      type: String,
      required: true,
      trime: true,
    },
    techstack: [],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
