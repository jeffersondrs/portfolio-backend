import express from "express";
import { getMessages, createMessage } from "../controllers/messageController";

const router = express.Router();

router.get("/", (request, response) => {
  response.status(200).json({
    message: "Hello World",
  });
});

router.get("/messages", getMessages).post("/messages", createMessage);

export default router;
