const { HttpError } = require("../helpers");

const isEmptyBody = async (req, res, next) => {
  const keys = Object.keys(req.body);
  if (!keys.length) {
    return next(HttpError(400, "Missing required field names"));
  }
  next();
};

module.exports = isEmptyBody;
