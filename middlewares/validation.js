import mongoose from "mongoose";
import createError from "http-errors";

const { BadRequest } = createError;

export const validation = (schema) => {
  return (req, res, next) => {
    const { favorite } = req.body;
    if (!mongoose.Types.ObjectId.isValid(favorite)) {
      throw new BadRequest("Missing field favorite");
    }
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
      return;
    }
    next();
  };
};
