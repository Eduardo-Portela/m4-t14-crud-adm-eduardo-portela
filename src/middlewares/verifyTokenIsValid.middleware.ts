import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";

const verifyTokenIsValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Token is missing!", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, "SecretKey", (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }
    req.user = {
      id: Number(decoded.sub),
      admin: decoded.isAdmin,
    };
    return next();
  });
};

export default verifyTokenIsValid;
