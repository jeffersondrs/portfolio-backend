import "express-async-errors";
import express from "express";
import cors from "cors";
import router from "./routers/router";
import morgan from "morgan";
import helmet from "helmet";

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("tiny"));

app.use(helmet());

app.use("/api", router);

export default app;
