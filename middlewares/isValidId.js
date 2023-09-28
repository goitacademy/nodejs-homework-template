const { isValidObjectId } = require("mongoose");

const errorHandler = require("../utilits/errorHandler");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(errorHandler(400, `${contactId} is not valid Id`));
  }
  next();
};

module.exports = isValidId;