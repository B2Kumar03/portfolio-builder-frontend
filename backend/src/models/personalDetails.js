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
      trime: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      trime: true,
    },
    email: {
      type: String,
      required: true,
      trime: true,
    },
    linkedIn: {
      type: String,
      required: true,
      trime: true,
    },
    github: {
      type: String,
      required: true,
      trime: true,
    },
    summary:{
      type: String,
      required: true,
      trime: true,
    },
    location: {
      type: String,
      required: true,
      trime: true,
    },
  },
  { timestamps: true }
);

const PersonalDetails = mongoose.model("PersonalDetails", pesonalDetailsSchema);

export default PersonalDetails;
