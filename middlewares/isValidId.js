const { isValidObjectId } = require("mongoose");

const { RequestError } = require("../helpers");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    const error = RequestError(400, `${contactId} is not correct id format`);
    next(error);
  }
  next();
};

module.exports = isValidId;
