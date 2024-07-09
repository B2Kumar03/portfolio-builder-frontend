import { Router } from "express";
import { generateDetails } from "../controllers/ai.controllers.js";

const aiRouter=Router()

aiRouter.route("/generate-details").post(generateDetails)


export default aiRouter