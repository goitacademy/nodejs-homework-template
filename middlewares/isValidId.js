const { isValidObjectId } = require("mongoose");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    const error = new Error(`${contactId} is not correct format`);
    error.status = 400;
    throw error;
  }
  next();
};

module.exports = isValidId;