import HttpError from "../helpers/HttpError.js";

const isEmptyBody = (req, _, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    next(HttpError(400, `The fields must be completed`));
  }
  next();
};

export default isEmptyBody;
