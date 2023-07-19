import { Response, Request } from "express";
import { User } from "../models/UserModel";
import { generateToken } from "../middlewares/authProvider";
import bcrypt from "bcrypt";

const signInUser = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    const userInfos = await User.findById(user?._id).select("-password");

    if (!user) {
      return response.status(401).json({ message: "E-mail não encontrado." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response.status(401).json({ message: "Senha inválida." });
    }

    const token = generateToken(user._id.toString());

    response.status(200).json({ token, userInfos });
  } catch (error) {
    response.status(500).json({ message: "Erro ao fazer login." });
  }
};

export { signInUser };
