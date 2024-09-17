const { HttpError } = require("../helpers");

const isValidateUser = (req, res, next) => {
  if (!req.body) {
    next(HttpError(400));
  }

  next();
};

module.exports = isValidateUser;