const { HttpError } = require("../helpers");

const updateBody = (req, res, next) => {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  next();
};

module.exports = updateBody;
