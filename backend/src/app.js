import express from "express";
import userRouter from "./routes/user.routes.js";
import emailCheckRouter from "./routes/email.check.routes.js";
import projectRouter from "./routes/projectRouter.routes.js";
import personalDatilsRoutes from "./routes/personalDetails.routes.js";
import skillsController from "./controllers/skills.controller.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1",emailCheckRouter)
app.use("/api/v1/users/",projectRouter)
app.use("/api/v1/users",personalDatilsRoutes)
app.use("/api/v1/users",skillsController)

export default app;
