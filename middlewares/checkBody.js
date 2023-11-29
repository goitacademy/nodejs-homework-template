const { HttpError } = require("../helpers");

const checkBody = (req, res, next) => {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  next();
};

module.exports = checkBody;
