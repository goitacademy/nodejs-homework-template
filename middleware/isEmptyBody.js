import { HttpError } from "../helpers/index.js";

export const isEmptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, "missing fields"));
  }
  next();
}
export const isEmptyBodyFavorite = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, "missing fields favorite"));
  }
  next();
}




