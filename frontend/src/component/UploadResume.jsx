import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { MdOutlineCloudDone } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { update_resume } from "../redux/isFilled/actionCreator";

const UploadResume = () => {
  const toast = useToast();
  const [resume, setResume] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const state = useSelector((state) => state.isFilled);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!resume) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    const formData = new FormData();
    formData.append("url", resume); // Ensure this key matches your backend API expectations

    const token = JSON.parse(localStorage.getItem("token") || "{}");
    if (!token) {
      toast({
        title: "Error",
        description: "User is not authenticated",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    const toastId = toast({
      title: "Uploading...",
      description: "Your resume is being uploaded",
      status: "info",
      duration: null,
      isClosable: true,
      position: "top-right",
    });

    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://porifolio-builder-backend-1.onrender.com/api/v1/users/upload-resume", // Updated URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResumeUrl(data.data.url);
      localStorage.setItem("resume", "true");
      setLoading(false);
      toast.update(toastId, {
        title: "Resume uploaded successfully",
        description: "Your resume has been uploaded successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.error("Upload Error:", error);
      setLoading(false);
      const errorMessage = error.response
        ? error.response.data.message
        : "Failed to upload resume";
      toast.update(toastId, {
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    async function fetchResume() {
      const token = JSON.parse(localStorage.getItem("token") || "{}");
      if (!token) {
        toast({
          title: "Error",
          description: "User is not authenticated",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }

      try {
        const { data } = await axios.get(
          "https://porifolio-builder-backend-1.onrender.com/api/v1/users/get-resume",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.data) {
          dispatch(update_resume());
          setResumeUrl(data.data.url);
        }
      } catch (error) {
        console.error("Resume Error:", error);
        const errorMessage = error.response
          ? error.response.data.message
          : "Failed to fetch resume";
        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
    fetchResume();
  }, [toast, dispatch]);

  const handleUpdate = () => {
    setResume(null);
    setResumeUrl("");
  };

  return (
    <div className="border p-10 rounded-lg grid gap-5 grid-cols-1">
      <div>
        <div className="font-bold text-[18px] flex gap-2 items-center">
          <div className="text-[#3F83F8]">Upload Resume</div>
          <div className="text-[15px] font-medium text-[#ccc]">Saved</div>
          <div className="text-[15px]">
            <MdOutlineCloudDone />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <input type="file" onChange={handleFileChange} />
        {resumeUrl && (
          <div className="mt-5">
            <h3 className="text-lg font-bold">Uploaded Resume</h3>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              <div className="text-[#3F83F8] underline">{resume ? resume.name : "Resume"}</div>
            </a>
          </div>
        )}
      </div>
      <div className="border-3 p-2 mt-5 flex place-content-end">
        <button
          onClick={handleUpload}
          className="bg-[#3F83F8] border-3 p-4 mt-5 text-[20px] font-bold text-[white] rounded-lg mr-2"
          disabled={loading}
        >
          {loading ? "Uploading..." : resumeUrl ? "Update Resume" : "Upload Resume"}
        </button>
        {resumeUrl && (
          <button
            onClick={handleUpdate}
            className="bg-red-500 border-3 p-4 mt-5 text-[20px] font-bold text-[white] rounded-lg"
            disabled={loading}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadResume;
