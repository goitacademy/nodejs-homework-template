const HttpError = require("../helpers/httpError");

const validateParams = (req, res, next) => {
  const { contactId } = req.params;
  if (!contactId) {
    next(HttpError(400, "Bad Request"));
  }
  next();
};

module.exports = validateParams;
