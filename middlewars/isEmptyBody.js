import { HttpError } from "../helpers/index.js";

const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  console.log(req);
  if (!length) {
    next(HttpError(400, "Body need requied fields"));
  }
  next();
};

export default isEmptyBody;
