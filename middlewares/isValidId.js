const { isValidObjectId } = require("mongoose");
const { IdError } = require("../errorHandlers");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    const error = new IdError(
      contactId,
      400,
      `id: ${contactId} is not in correct format`
    );

    next(error);
  }
  next();
};

module.exports = isValidId;
