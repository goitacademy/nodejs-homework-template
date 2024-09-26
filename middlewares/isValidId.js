const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../helpers");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    const error = new RequestError(
      400,
      `${contactId} is not correct id format`
    );
    return next(error);
  }
  next();
};

module.exports = isValidId;
