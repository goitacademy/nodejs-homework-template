const { HttpError } = require("../helpers");

const isEmptyBody = async (req, res, next) => {
  const keys = Object.keys(req.body);
  if (!keys.length) {
    return next(HttpError(400, "missing fields"));
  }
  next();
};

const isEmptyFavoriteUpdate = async (req, res, next) => {
  const keys = Object.keys(req.body);
  if (keys.length === 0) {
    return next(HttpError(400, "Missing field favorite"));
  }
  next();
};

module.exports = {
  isEmptyBody,
  isEmptyFavoriteUpdate,
};
