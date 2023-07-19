import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/global";

export const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET || "seu_segredo_padrao";
  const expiration = process.env.JWT_EXPIRATION || "1d";
  return jwt.sign({ userId }, secret, { expiresIn: expiration });
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");
  const secret = process.env.JWT_SECRET || "seu_segredo_padrao";

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (!decoded.userId) {
      return res.status(403).json({ message: "Token inválido." });
    }

    if (req.params.userId !== decoded.userId) {
      return res.status(403).json({ message: "Acesso não autorizado." });
    }

    (req as AuthenticatedRequest).userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido." });
  }
};
