const { HttpError } = require("../helpers");
const { favoriteValidator } = require("../models");

const validateFavorite = () => {
  const func = async (req, res, next) => {

    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, "Missing field favorite"));
    }

    const { error } = await favoriteValidator(req.body);

    if (error) {
      next(HttpError(400, "Missing field favorite"));
    }

    next();
  };

  return func;
};

module.exports = validateFavorite;
