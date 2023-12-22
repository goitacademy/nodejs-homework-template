import { HttpError } from "../helpers/index.js";
const isEmptyFavorite = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    return next(HttpError(400, "Missing field favorite"));
  }
  next();
};
export default isEmptyFavorite;
