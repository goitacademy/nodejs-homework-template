const HttpError = require("../helpers/HttpError");

const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    return next(HttpError(400, "Body must have fields"));
  }
  next();
};

module.exports = isEmptyBody;
