import { Request, Response, NextFunction } from "express";
import { Conflict } from "http-errors";
import { responseErrorOrNext, validateObject } from "../helpers";
import { joiUserSchema, User } from "./../model";
import { IUser } from "./../helpers";
import { isEmailInUsers } from "../helpers";

const signupUserValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requiredFields = ["email", "password"];

  const { error } = validateObject(req.body, joiUserSchema, requiredFields);

  responseErrorOrNext(error, res, next);
};

const checkEmailInUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users: Array<IUser> = await User.find();
  const { email } = req.body;

  if (await isEmailInUsers(users, email)) {
    return next(new Conflict("User with same email already exists."));
  }

  next();
};

export { signupUserValidation, checkEmailInUsers };
