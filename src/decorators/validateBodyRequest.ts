import Joi from "joi";
import { HttpError } from "../helpers/index";
import type { Request, Response, NextFunction } from "express";

const validateBodyRequest = (schema: Joi.Schema) => {
  const func = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBodyRequest;
