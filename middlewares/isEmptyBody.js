import { HttpError } from "../helpers/index.js";

const isEmptyBody = (req, res, next) => {
  console.log(Object.keys(req.body).length)
  if (!Object.keys(req.body).length) {
    return  next(HttpError(400, "missing required name field"))
  }
  next()
};

export default isEmptyBody