import HttpError from "../helpers/htppEror.js";

const isEmptyBody = async (req, res, next) => {
  const keys = Object.keys(req.body);
  console.log(req.body);
  if (!keys.length) {
    return next(HttpError(400, "missing  fields"));
  }
  next();
};

export default isEmptyBody;
