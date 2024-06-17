import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const userShema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    avtar: {
      type: String,
      required: true,
    },
    password:{
      type:String,
      required:true
    },
    token:{
      type:String
    }
  },
  { timestamps: true }
);

userShema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userShema.methods.isPasswordCorrect = async function(password)  {
  return await bcrypt.compare(password, this.password);
};

userShema.methods.generateAccessToken=async function(){
   return await jwt.sign(
    {
        _id:this._id,
        email:this.email,
        userName:this.userName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
   )
}

const User = mongoose.model("User", userShema);

export default User;
