import "express-async-errors";
import { Request, Response } from "express";
import { User, UserOthersInfos } from "../models/UserModel";
import multer from "multer";
import { AuthenticatedRequest } from "src/types/global";

const upload = multer({ dest: "uploads/" });

const getUsers = async (request: Request, response: Response) => {
  try {
    const users = await User.find()
      .select("-password")
      .populate("userOthers")
      .exec();
    response.status(200).json(users);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

const createUser = async (request: Request, response: Response) => {
  try {
    const user = await User.create(request.body);
    response.status(201).json(user);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

const getUserOthersInfos = async (request: Request, response: Response) => {
  try {
    const userIdFromToken = (request as AuthenticatedRequest).userId;
    const userIdFromRoute = request.params.userId;

    const userId = request.params.userId;
    const user = await User.findById(userId)
      .select("-password")
      .populate("userOthers")
      .exec();

    if (!user) {
      return response.status(404).json({ message: "Usuário não encontrado." });
    }

    if (!userId)
      return response.status(404).json({ message: "Usuário não encontrado." });

      if (userIdFromToken !== userIdFromRoute) {
        return response.status(403).json({ message: "Acesso não autorizado." });
      }

    if (!user.userOthers) {
      return response.status(404).json({
        message: "Informações adicionais não encontradas para este usuário.",
      });
    }

    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

const createUserOthersInfos = async (request: Request, response: Response) => {
  try {
    const userOthersData = request.body;
    const userId = request.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).json({ message: "Usuário não encontrado." });
    }
    if (user.userOthers) {
      const updatedUserOthers = await UserOthersInfos.findByIdAndUpdate(
        user.userOthers,
        userOthersData,
        { new: true }
      );

      return response.status(200).json(updatedUserOthers);
    } else {
      const userOthers = await UserOthersInfos.create(userOthersData);
      user.userOthers = userOthers;
      await user.save();

      return response.status(201).json(userOthers);
    }
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

export { getUsers, createUser, createUserOthersInfos, getUserOthersInfos };
