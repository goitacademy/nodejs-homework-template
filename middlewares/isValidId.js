const { isValidObjectId } = require("mongoose");
const { BadRequest } = require("http-errors");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    throw new BadRequest(`Id=${contactId} is not valid`);
  }
  next();
};

module.exports = isValidId;
