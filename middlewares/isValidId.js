const { isValidObjectId } = require("mongoose");
const httpError = require("../helpers/httpError");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(httpError(404, "Not found"));
  }
  next();
};

module.exports = isValidId;
