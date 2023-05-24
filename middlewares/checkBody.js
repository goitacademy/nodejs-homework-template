const { HttpError } = require("../helpers");

const checkBody = (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    throw HttpError(400, "missing fields");
  }
  next();
};

module.exports = {
  checkBody,
};
