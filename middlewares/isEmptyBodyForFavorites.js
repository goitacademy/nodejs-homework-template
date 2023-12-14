import { HttpError } from "../helpers/index.js";

const isEmptyBodyForFavorites = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, "Missing field favorite!"));
  }
  next();
};

export default isEmptyBodyForFavorites;
