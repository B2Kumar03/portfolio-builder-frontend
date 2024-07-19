import { asyncHandler } from "../utils/asynchandler.js";
import cloudinaryUpload from "../utils/cloudnaryUpload.js";
import User from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res
      .status(201)
      .json({ message: "all field are required", success: false });
  }
  const existence = await User.findOne({ email });
  console.log(existence);
  if (existence) {
    return res
      .status(201)
      .json({ message: "With this email user already exist", success: false });
  }
  const localPathFile = req.file?.path;
  
  if (!localPathFile) {
    return res
      .status(201)
      .json({ message: "avtar is required", success: false });
  }
  const cloudinaryURL = await cloudinaryUpload(localPathFile);
  if (!cloudinaryURL.url) {
    return res
      .status(404)
      .json({
        message: "error occurs while uploading file on the cloudinary",
        success: false,
      });
  }
  const user = {
    userName,
    email,
    avtar:cloudinaryURL.url,
    password
  };

  const resdatabse = await User.create(user);
  if (!resdatabse) {
    return res
      .status(404)
      .json({ message: "error occurs while creating user", success: false });
  }
  return res
    .status(200)
    .json({ message: "user created successfully", success: true });
});


const login=asyncHandler((async(req,res)=>{
  const{email,password}=req.body
  console.log(email);
  if(!email||!password){
    return res.status(401).json({message:"Email and password is required",success:false})
  }
  const findUser=await User.findOne({
    email: email.toLowerCase().trim(),
  })

  if(!findUser){
    return res.status(401).json({message:"User not found",success:false})
  }
  const passwordIsCorrect=await findUser.isPasswordCorrect(password)

  if(!passwordIsCorrect){
    return res.status(401).json({message:"Invalid credential",success:false})
  }

  const token=await findUser.generateAccessToken()
  if(!token){
    return res.status(401).json({message:"Error occurs while generating token",success:false})
  }
  findUser.token=token;
  await findUser.save({ validateBeforeSave: false });
  return res.status(200).json({token:token,success:true})

}))

const getUser=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.user._id).select("-password -token")
  if(!user){
    return res.status(404).json({message:"User not found",success:false})
  }
  return res.status(200).json({user:user,success:true})
})



export { registerUser,login,getUser };


