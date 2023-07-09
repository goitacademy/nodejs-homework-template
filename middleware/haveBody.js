const { newError } = require("../helpers");

const haveBody = (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    next(newError(400, "missing fields"));
  }
  next();
};

module.exports = haveBody;
