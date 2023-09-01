import HttpError from "./HttpError.js";

const checkBody = (req, res, next) => {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    throw new HttpError(400, "missing fields");
  }
  next();
};

export default checkBody;
