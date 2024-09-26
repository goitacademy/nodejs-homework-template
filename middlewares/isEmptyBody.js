const HttpError = require("../helpers/HttpError.js");

const isEmptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, "All fields are empty!"));
  }
  next();
};

module.exports = isEmptyBody;
