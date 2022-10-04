const { isValidObjectId } = require("mongoose");
const { requestError } = require("../helpers");

const idValidation = (req, _, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    const error = requestError(400, `${contactId} is not corrent id format`);
    next(error);
  }
  next();
};

module.exports = idValidation;
