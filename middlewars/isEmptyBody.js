import { HttpError } from "../helpers/index.js";

const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    const field =
      req.method === "PATCH" ? "missing field favorite" : "missing fields";
    next(HttpError(400, field));
  }
  next();
};

export default isEmptyBody;
