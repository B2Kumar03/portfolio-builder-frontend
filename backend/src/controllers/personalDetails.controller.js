import PersonalDetails from "../models/personalDetails.js";
import { asyncHandler } from "../utils/asynchandler.js";

// @desc    Create or update personal details
// @route   POST /api/personalDetails
// @access  Public
const updatePersonalDetails = asyncHandler(async (req, res) => {
  const { fullName, phoneNumber, email, linkedIn, github, location } = req.body;

  // Check if all required fields are provided
  if (!fullName || !phoneNumber || !email || !github || !location) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill all the required fields" });
  }

  try {
    // Check if personal details already exist
    let personalDetails = await PersonalDetails.findOne({ email });

    if (personalDetails) {
      // If details exist, update them
      personalDetails = await PersonalDetails.findOneAndUpdate(
        { email },
        { $set: { fullName, phoneNumber, linkedIn, github, location } },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        msg: "Personal details updated successfully",
        data: personalDetails,
      });
    } else {
      // If details do not exist, create new entry
      personalDetails = await PersonalDetails.create({
        fullName,
        phoneNumber,
        email,
        linkedIn,
        github,
        location,
        userId:"66698a3b044f84b71e243577"
      });

      return res.status(201).json({
        success: true,
        msg: "Personal details added successfully",
        data: personalDetails,
      });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, msg: "Something went wrong", error: err.message });
  }
});

export default updatePersonalDetails;
