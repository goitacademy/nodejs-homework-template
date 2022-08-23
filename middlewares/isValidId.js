const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../utils");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    const error = RequestError(
      400,
      `${contactId} is not correct contactId format`
    );
    next(error);
  }
  next();
};

module.exports = isValidId;
