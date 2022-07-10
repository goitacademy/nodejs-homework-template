const { isValidObjectId } = require("mongoose");
const getError = require("../helpers/error");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);
  if (!result) {
    throw getError(404, "Invalid id");
  }
  next();
};

module.exports = isValidId;
