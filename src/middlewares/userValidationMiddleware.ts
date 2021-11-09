import { Request, Response, NextFunction } from "express";
import { BadRequest } from "http-errors";
import { responseErrorOrNext, validateObject } from "../helpers";
import { joiUserSchema } from "./../model";

const signupUserValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requiredFields = ["email", "password"];

  const { error } = validateObject(req.body, joiUserSchema, requiredFields);

  responseErrorOrNext(error, res, next);
};

export { signupUserValidation };
