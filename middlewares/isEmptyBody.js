import { HttpError } from "../helpers/index.js";

const isEmptyBody = (message = "missing fields") => {
  return (req, res, next) => {
    const { length } = Object.keys(req.body);
    if (!length) {
      return next(HttpError(400, message));
    }
    next();
  };
};

export default isEmptyBody;
