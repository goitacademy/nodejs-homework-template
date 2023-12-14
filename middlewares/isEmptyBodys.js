import { HttpError } from "../helpers/index.js";

const isEmptyBody = (req, res, next) => {
  console.log(req.body);
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, "Body must have fields"));
  }
  next();
};

export default isEmptyBody;
