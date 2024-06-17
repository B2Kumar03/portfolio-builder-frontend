import mongoose from "mongoose";

const pesonalDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    linkedIn: {
      type: String,
      required:true
    },
    github: {
      type: String,
      required:true
    },
    location: {
      type: String,
      required:true
    },
  },
  { timestamps: true }
);

const PersonalDetails=mongoose.model("PersonalDetails",pesonalDetailsSchema)

export default PersonalDetails
