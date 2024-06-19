import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    email: {
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
