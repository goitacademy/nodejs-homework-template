const { HttpError } = require("../helpers");

const isAmptyEmailField = (req, res, next) => {
  const { length } = Object.keys(req.body);

  if (!length) next(HttpError(400, "missing required field email"));

  next();
};

module.exports = isAmptyEmailField;
