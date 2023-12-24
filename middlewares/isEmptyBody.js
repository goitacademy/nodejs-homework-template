import HttpError from "../utils/HttpError.js";

const isEmptyBody = async (req, res, next) => {
  const keys = Object.keys(req.body);
  if (!keys.length) {
    return next(HttpError(400, "Body cannot be empty"));
  }
  next();
};

export default isEmptyBody;
