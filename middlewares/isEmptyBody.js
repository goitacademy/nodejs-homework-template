import { HttpError } from "../helpers/index.js";

const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    if (req.method === "PATCH") {
      next(HttpError(400, "missing field favorite"));
    } else {
      next(HttpError(400, "missing fields"));
    }
  }
  next();
};

export default isEmptyBody;
