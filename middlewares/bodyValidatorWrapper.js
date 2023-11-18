import { HttpError } from "../helpers/HttpError.js";

export const contactValidator = (schema) => (data) => {
  return schema.validate(data, { abortEarly: false });
};

export const authValidator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) next(HttpError(400, error.message));

  return next();
};
