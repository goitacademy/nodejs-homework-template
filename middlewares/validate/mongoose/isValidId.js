const { isValidObjectId } = require("mongoose");
const { createError } = require("../../../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);
  if (!result) {
    throw createError(400, "Invalid id");
  }
  next();
};

module.exports = isValidId;
