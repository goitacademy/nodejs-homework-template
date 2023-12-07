import { Request, Response, NextFunction } from "express";
import { HttpError } from "../helpers";
import Joi from "joi";

type JoiSchema = Joi.ObjectSchema<any>;

const validateBody = (schema: JoiSchema) => {
  const func = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;
