const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    next(createError(400, `${contactId} is not a valid id`));
  }
  next();
};

module.exports = isValidId;
