import { Router } from "express";
import skillsController from "../controllers/skills.controller.js";

const skillsRoutes = Router();

skillsRoutes.route("/skills").post(skillsController);


export default skillsRoutes
