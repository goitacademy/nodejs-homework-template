const { HttpError } = require("../helpers/HttpError");

const isEmptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, "Missing required fields"));
  }
  next();
};

module.exports = isEmptyBody;
