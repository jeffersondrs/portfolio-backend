import express from "express";
import {
  getUsers,
  createUser,
  createUserOthersInfos,
  getUserOthersInfos,
} from "../controllers/signUpUser";
import { signInUser } from "../controllers/signInUser";
import { authenticateToken } from "../middlewares/authProvider";

const router = express.Router();

router.get("/", (request, response) => {
  response.status(200).json({
    message: "Olá, seja bem-vindo(a) à API de usuários Job Media!",
  });
});

router
  .get("/users", authenticateToken, getUsers)
  .get("/user/:userId", authenticateToken, getUserOthersInfos)
  .post("/user", createUser)
  .post("/users/:userId", authenticateToken, createUserOthersInfos);

router.post("/login", signInUser);

export default router;
