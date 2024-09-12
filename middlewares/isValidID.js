const { isValidObjectId } = require("mongoose");

const { httpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(httpError(400, `${contactId} is not valid ID`));
  }
  next();
};

module.exports = isValidId;
