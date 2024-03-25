import express from "express";
import env from "dotenv";
import cors from "cors";
import http from "http";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import userRouter from "./routes/user.route.js";
import { ErrorMiddleware } from "./middlewares/error.js";
import { swaggerDocument } from "./docs/index.js";
import swaggerUiExpress from "swagger-ui-express";

env.config();


const app = express();
app.use(cors());


app.use(express.json());
app.use("/UserImage", express.static("upload/UserImage"));
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(ErrorMiddleware);
