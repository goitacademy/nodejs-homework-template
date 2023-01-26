const { isValidObjectId } = require("mongoose");
const { BadRequest } = require("http-errors");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    next(new BadRequest(`${contactId} is not correct id format`));
  }
  next();
};

module.exports = isValidId;
