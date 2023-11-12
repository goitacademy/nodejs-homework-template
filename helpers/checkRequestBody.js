const HttpError = require("./HttpError");

const checkRequestBody = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(HttpError(400, "Missing field favorite"));
  }
  next();
};

module.exports = checkRequestBody;
