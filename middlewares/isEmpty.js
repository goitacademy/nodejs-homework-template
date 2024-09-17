import { HttpError } from "../helpers/index.js";

const isEmpty = (req, res, next) => {
  const emptyBody = !Object.keys(req.body).length;
  if (emptyBody) {
    next(HttpError(400, "missing fields"));
  }
  next();
};

export default isEmpty;
