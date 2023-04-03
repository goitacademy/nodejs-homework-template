const { AppError } = require('../utils');

const checkFavorite = async (req, res, next) => {
  const isBoolean = 'boolean' === typeof req.body.favorite;

  if (!isBoolean) {
    return next(new AppError(400, 'missing field favorite'));
  }

  next();
};

module.exports = checkFavorite;
