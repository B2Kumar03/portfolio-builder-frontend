import { asyncHandler } from "../utils/asynchandler.js";
import cloudinaryUpload from "../utils/cloudnaryUpload.js";
import Project from "../models/project.model.js";

// Function to handle both create and update project
const project = asyncHandler(async (req, res) => {
  const { projectTitle, projectDescription, techstack, email } = req.body;
  const projectId = req.params.id;

  if (!projectTitle || !projectDescription || !techstack) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill all the fields" });
  }

  let cloudinaryUrl = { url: null };

  const localPathFile = req.file?.path;
  if (localPathFile) {
    cloudinaryUrl = await cloudinaryUpload(localPathFile);
    if (!cloudinaryUrl) {
      return res
        .status(400)
        .json({ success: false, msg: "Image upload failed" });
    }
  }

  const projectData = {
    projectTitle,
    projectDescription,
    techstack,
    projectImage: cloudinaryUrl.url,
    email,
  };

  let savedProject;

  if (projectId) {
    savedProject = await Project.findByIdAndUpdate(projectId, projectData, {
      new: true,
      runValidators: true,
    });
  } else {
    savedProject = await Project.create(projectData);
  }

  if (!savedProject) {
    return res
      .status(400)
      .json({ success: false, msg: "Project operation failed" });
  }

  const successMsg = projectId
    ? "Project updated successfully"
    : "Project created successfully";
  res
    .status(projectId ? 200 : 201)
    .json({ success: true, msg: successMsg, data: savedProject });
});

const getProject = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    
    if (!user || !user.email) {
      return res.status(400).json({ message: 'User or email not provided', success: false });
    }

    const email = user.email;
    const data = await Project.find({ email });

    if (!data) {
      return res.status(404).json({ message: 'No projects found', success: false });
    }

    res.status(200).json({ data, success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error', success: false });
  }
});
export { project, getProject };
