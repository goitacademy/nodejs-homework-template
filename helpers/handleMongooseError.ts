import { MongoError } from "mongodb";
import { NextFunction } from "express";

const handleMongooseError = (
  error: MongoError,
  data: any,
  next: NextFunction
) => {
  const { name, code }: MongoError = error as MongoError;
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  error.code = status;
  next();
};

export default handleMongooseError;
