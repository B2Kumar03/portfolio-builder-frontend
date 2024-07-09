import { Router } from "express";
import {updatePersonalDetails,getPersonalDetails} from "../controllers/personalDetails.controller.js";
import accessAuthMiddleware from "../middlewares/accessAuth.middleware.js";

const personalDatilsRoutes = Router();

personalDatilsRoutes.route("/personalDetails").post(updatePersonalDetails);
personalDatilsRoutes.route("/personalDetails").get(accessAuthMiddleware,getPersonalDetails);


export default personalDatilsRoutes
