const { isValidObjectId } = require("mongoose");
const { requestError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  const isCorrectId = isValidObjectId(contactId);
  console.log(isCorrectId);

  if (!isCorrectId) {
    const error = requestError(400, `${contactId} is not corrent ID format`);

    next(error);
  }

  next();
};

module.exports = isValidId;
