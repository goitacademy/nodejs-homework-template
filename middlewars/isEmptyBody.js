const HttpErr = require("../helpers/HttpError");

const isEmptyBody = async (req, res, next) => {
  const keys = Object.keys(req.body);
  if (!keys.length) {
    return next(HttpErr(400, "missing fields"));
  }
  next();
};
module.exports = isEmptyBody;
