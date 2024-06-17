
import {asyncHandler} from "../utils/asynchandler.js"
import kickbox from "kickbox"

const nkickbox=new kickbox.client("live_566d78ed2777c992af5bebfd3fa9c728256dd52f4a7600c92b373585fb442ef3").kickbox()
   

const emailCheck=asyncHandler(async(req,res)=>{
    const {email}=req.body
    console.log(email);
    nkickbox.verify(email,{timeout: 6000}, function (err, response) {
        // Let's see some results
        console.log(response);
      });
})
export default emailCheck