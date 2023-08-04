const { HttpError } = require("../helpers");

const isValidBody = (req, res, next) => {
  if (!req.body.favorite) {
    next(HttpError(400, "missing field favorite"));
  }

  next();
};

module.exports = isValidBody;