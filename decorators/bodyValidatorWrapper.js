import { HttpError } from "../helpers/HttpError.js";

export const bodyValidator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (typeof error !== "undefined") {
    const errorMessages = error.details
      .map((err) => `${err.message}`)
      .join(", ");
    return res.status(400).json({ message: errorMessages });
  }

  if (error) next(HttpError(400, error.message));

  return next();
};
