const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    const error = HttpError(404, `${contactId} is not correct id format`);
    next(error);
  }
  next();
};

module.exports = isValidId;
