import type { CallbackError, Query } from "mongoose";
import { IContactSchema } from "./Contact";
import { UserDocument } from "../types/index";

export const handleSaveErr = (err: any, data: UserDocument, next: any) => {
  const { code, name } = err;

  err.status = name === "MongoServerError" && code === 11000 ? 409 : 404;
  next(err);
};

export const handlePreUpdate = function (
  this: Query<IContactSchema, IContactSchema>,
  next: (err?: CallbackError) => void
) {
  this.setOptions({ new: true, runValidators: true });
  next();
};
