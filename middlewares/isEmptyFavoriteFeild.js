import HttpError from "../helpers/HttpError.js";

const isEmptyFavoriteFeils = (req, _, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    next(HttpError(400, `Missing field favorite`));
  }
  next();
};

export default isEmptyFavoriteFeils;
