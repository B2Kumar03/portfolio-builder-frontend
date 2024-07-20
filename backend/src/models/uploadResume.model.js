import mongoose from "mongoose";

const resumeSchema=new mongoose.Schema({
    url:{
        type:String,
        required:true,
        trime:true
    },
    email:{
        type:String,
        required:true
    }
})

const Resume=mongoose.model("Resume",resumeSchema);

export default Resume