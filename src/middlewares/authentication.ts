import "dotenv/config";
import jsonwebtoken from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../helpers/index";
import { ctrlContactWrapper } from "../decorators/index";
import User from "../models/User";
import { IUser } from "../types/index";

const { JWT_SECRET_KEY } = process.env;

const authentication = async (
  req: Request & IUser,
  res: Response & { id: string },
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw HttpError(401, "Not authorized");
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw HttpError(401, "Invalid auth type");
  }

  try {
    const resp: any = jsonwebtoken.verify(token, JWT_SECRET_KEY!);

    const user: IUser["user"] | null = await User.findById(resp.id);

    if (!user || !user.token || user.token !== token) {
      throw HttpError(401, "Not authorized");
    }

    req.user = user;

    next();
  } catch (error) {
    throw HttpError(401, (error as Error).message);
  }
};

export default ctrlContactWrapper(authentication);
