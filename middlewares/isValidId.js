const { isValidObjectId } = require("mongoose");

const { createError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    const error = createError(400, "Not id");
    next(error);
    return;
  }
  next();
};

module.exports = isValidId;
