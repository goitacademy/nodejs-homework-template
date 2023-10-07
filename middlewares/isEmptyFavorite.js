import {HttpError} from "../helpers/index.js";

export const isEmptyFavorite = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, "missing field favorite"));
  }
  next();
};