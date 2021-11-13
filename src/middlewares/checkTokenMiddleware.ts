import { Request, Response, NextFunction } from "express";
import { Unauthorized } from "http-errors";
import jwt from "jsonwebtoken";
import { User } from "../model";
import { SECRET_KEY } from "./../config";

type Auth = [bearer: string, token: string];

const authenticateUser = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const [bearer, token]: Auth = req.headers.authorization!.split(" ") as Auth;

  if (bearer !== "Bearer") {
    next(new Unauthorized("Not authorized"));
  }

  try {
    const id = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user) {
      next(new Unauthorized("Not authorized"));
    }

    if (req.originalUrl.includes("/api/contacts")) {
      req.body.owner = user._id;
    }

    if (req.originalUrl.includes("/api/users")) {
      req.body.user = user;
    }
  } catch (error) {
    next(new Unauthorized(`Not authorized: ${error}`));
  }

  next();
};

export { authenticateUser };
