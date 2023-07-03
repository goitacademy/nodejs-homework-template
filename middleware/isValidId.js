const { HttpError } = require("../helpers");
const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    throw new HttpError(400, "Not found");
  }
  next();
};

module.exports = isValidId;
