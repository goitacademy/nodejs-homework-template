const { isValidObjectId } = require("mongoose");
const { httpError } = require("../utils");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(httpError(400, `${contactId} is not a valid`));
  }
  next();
};

module.exports = isValidId;