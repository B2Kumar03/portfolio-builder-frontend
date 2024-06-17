import { Router } from "express";
import updatePersonalDetails from "../controllers/personalDetails.controller.js";

const personalDatilsRoutes = Router();

personalDatilsRoutes.route("/personalDetails").post(updatePersonalDetails);


export default personalDatilsRoutes
