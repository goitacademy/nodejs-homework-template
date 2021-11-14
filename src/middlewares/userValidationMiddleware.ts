import { Request, Response, NextFunction } from "express";
import { responseErrorOrNext, validateObject } from "../helpers";
import { joiUserSchema } from "./../model";

const userValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requiredFields = ["email", "password"];

  const { error } = validateObject(req.body, joiUserSchema, requiredFields);

  responseErrorOrNext(error, res, next);
};

export { userValidation };
