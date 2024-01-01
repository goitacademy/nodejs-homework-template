import { HttpError } from "../helpers/index.js";
const isEmpty = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) next(HttpError(400, "missing fields"));
  next();
};

export default isEmpty;
