const { HttpError } = require("../helpers");

const isEmptyBody = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(HttpError(400, "Missing fields"));
  }
  next();
};

const isEmptyFavorite = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(HttpError(400, "Missing favorite"));
  }
  next();
};

module.exports = { isEmptyBody, isEmptyFavorite };
