import { Request, Response } from "express";
import Message from "../models/message";

const getMessages = async (request: Request, response: Response) => {
  try {
    const messages = await Message.find();

    return response.status(200).json({
      messages,
    });
  } catch (error) {
    return response.status(500).json({
      error,
    });
  }
};

const createMessage = async (request: Request, response: Response) => {
  try {
    const message = await Message.create(request.body);

    return response.status(201).json({
      message,
    });
  } catch (error) {
    return response.status(500).json({
      error,
    });
  }
};

export { getMessages, createMessage };
