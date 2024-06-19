import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const accessAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      res.status(401).json({ error: "Unauthorized", data: [] });
    }
    const token = authHeader.split(" ")[1];
  
    if (!token) {
      res.status(401).json({ error: "Unauthorized", data: [] });
    }
    // verify token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
    const user = await User.findById(decodedToken?._id).select("-password -token");
    if (!user) throw new ApiError(401, "Unauthorized user");
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({message:error.message})
  }
};

export default accessAuthMiddleware;
