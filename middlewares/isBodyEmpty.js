import { HttpError } from "../helpers/index.js";

const isBodyEmpty = (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    throw HttpError(400, "missing fields");
  next();
};
export default isBodyEmpty;
