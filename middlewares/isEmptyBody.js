import { HttpError } from "../helpers/index.js";

const isEmptyBody = (req, _, next) => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, "All fields are empty"));
  }
  next();
};

export default isEmptyBody;
