import HttpError from "../helpers/http-error.js";

const isEmptyBodyFav = (req, res, next) => {
  const length = Object.keys(req.body).length;
  if (!length) {
    return next(HttpError(400, "Missing field favorite"));
  }
  next();
};

export default isEmptyBodyFav;
