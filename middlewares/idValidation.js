const { isValidObjectId } = require("mongoose");

const { handleError } = require("../utils");

const idValidation = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(handleError(404, `${contactId} is not a valid`));
  }
  next();
};

module.exports = idValidation;
