import { HttpError } from "../helpers/index.js";

const isEmptyBody = async (req, res, next) => {
  const keys = Object.keys(req.body);
  if (keys.length === 0) {
    return next(HttpError(400, "Missing fields"));
  }
  next();
};
export default isEmptyBody;
