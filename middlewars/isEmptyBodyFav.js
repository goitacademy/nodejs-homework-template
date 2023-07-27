import { HttpError } from "../helpers/index.js";

const isEmptyBodyFav = (req, res, next) => {
  console.log(req.body);
  const { length } = Object.keys(req.body);
  if (!length) next(HttpError(400, "missing field favorite"));
  next();
};
export default isEmptyBodyFav;
