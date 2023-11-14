const HttpError = require("../helpers/HttpError");

const isEmptyBody = async (req, res, next) => {
  const keys = Object.keys(req.body);

  if (!keys.length) {
    return next(HttpError(400, "Body must have fields"));
  }

  next();
};

module.exports = isEmptyBody;
