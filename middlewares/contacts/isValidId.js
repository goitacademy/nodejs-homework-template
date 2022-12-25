const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../../helpers/contacts");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);

  if (!isCorrectId) {
    const error = HttpError(400, `${contactId} isn't correct ID format`);
    next(error);
  }
  next();
};

module.exports = isValidId;
