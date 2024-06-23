import { HttpError } from "../helpers/index.js";

export default function isEmptyBody(req, res, next) {
  const { length } = Object.keys(req.body);
  if (!length) {
    return next(HttpError(400, "Body must have fields"));
  }
  next();
}

export function isEmptyBodyFavorite(req, res, next) {
  const { length } = Object.keys(req.body);
  if (!length) {
    return next(HttpError(400, "missing field favorite"));
  }
  next();
}