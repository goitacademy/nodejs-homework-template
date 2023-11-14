import { HttpError } from "../helpers/index.js";

const isEmptyBody = async (res, req, next) => {
  const keys = Object.keys(res.body);

  if (!keys.length) {
    return next(HttpError(400, "Body must have fields"));
  }
  next();
};

export default isEmptyBody;
