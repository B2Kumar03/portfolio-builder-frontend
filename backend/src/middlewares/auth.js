import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asynchandler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  try {
    const user = await User.findOne({userId: id }).select("-password");
    if (!user) {
      return res.status(201).json({ message: "Invalid user" });
    } else {
      next();
    }
  } catch (error) {
    console.log("Error occurs whaile checking authouncation");
  }
});

export default authMiddleware
