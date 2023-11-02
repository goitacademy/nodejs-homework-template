const { HttpError } = require("../helpers/HttpError");

const isEmptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(new HttpError(400, "Missing fields"));
  }
  next();
};

module.exports = isEmptyBody;
