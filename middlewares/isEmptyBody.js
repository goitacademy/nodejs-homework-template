import HttpError from "../helpers/http-error.js";

const isEmptyBody = (req, res, next) => {
  const length = Object.keys(req.body).length;
  if (!length) {
    return next(HttpError(400, "Missing fields"));
  }
  next();
};

export default isEmptyBody;
