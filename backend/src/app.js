import express from "express";
import userRouter from "./routes/user.routes.js";
import projectRouter from "./routes/projectRouter.routes.js";
import personalDatilsRoutes from "./routes/personalDetails.routes.js";
import skills from "./routes/skills.routes.js"
import otpSender from "./routes/otpSender.controller.js"
import cors from "cors"
import aiRouter from "./routes/ai.routes.js";
import resumeRoute from "./routes/resumeUploader.routes.js";
const app = express();

app.use(cors())
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/v1/users", userRouter);//ad
app.use("/api/v1/users",projectRouter)
app.use("/api/v1/users",personalDatilsRoutes)
app.use("/api/v1/users",skills)
app.use("/api/v1/users",otpSender)


app.use("/api/v1/users",aiRouter)

app.use("/api/v1/users",resumeRoute)

export default app;
