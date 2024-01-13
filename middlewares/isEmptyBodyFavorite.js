import { HttpError } from "../helpers/index.js";

const isEmptyBodyFavorite = (req, res, next) => {
    const { length } = Object.keys(req.body);
    if (!length) {
    return next(HttpError(400, "Missing fields favorite"));
  }
  next();
};


export default isEmptyBodyFavorite;