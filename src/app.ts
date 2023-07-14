import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
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

app.get("/", (request: Request, response: Response) => {
    response.status(200).json({
        message: "Messages Api",
    });
});

export default app;
