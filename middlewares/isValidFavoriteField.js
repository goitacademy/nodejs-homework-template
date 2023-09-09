const { HttpError } = require("../helpers");

const isValidFavoriteField = (req, _, next) => {
  if (req.body && req.body.favorite === undefined) {
    next(HttpError(400, "missing field favorite"));
  }
  next();
};

module.exports = isValidFavoriteField;
