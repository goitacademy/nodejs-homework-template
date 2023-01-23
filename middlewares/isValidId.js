const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

// проверяем id
const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(404, "Invalid ID"));
  }
  next();
};

module.exports = isValidId;