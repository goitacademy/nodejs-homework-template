const { isValidObjectId } = require("mongoose");
const { newError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(newError(400, `${contactId} is not valid`));
  }
  next();
};

module.exports = isValidId;
