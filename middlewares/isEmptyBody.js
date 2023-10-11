import { HttpError } from "../helpers/index.js";

const isEmptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, "Missing fields"));
  }
  next();
};

export default isEmptyBody;
