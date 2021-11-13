import { Request, Response, NextFunction } from "express";
import { BadRequest } from "http-errors";
import { responseErrorOrNext, validateObject } from "../helpers";
import { joiContactSchema } from "../model";

const addContactValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requiredFields = ["name", "email", "phone"];

  console.log("re.body: ", req.body);

  const { error } = validateObject(req.body, joiContactSchema, requiredFields);

  responseErrorOrNext(error, res, next);
};

const updateContactValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateObject(req.body, joiContactSchema);

  if (Object.keys(req.body).length === 0) {
    next(new BadRequest("Empty request's body"));
  }

  responseErrorOrNext(error, res, next);
};

const updateStatusContactValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateObject(req.body, joiContactSchema, ["favorite"]);

  responseErrorOrNext(error, res, next);
};

export {
  addContactValidation,
  updateContactValidation,
  updateStatusContactValidation,
};
