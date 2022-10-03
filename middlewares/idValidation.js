const { isValidObjectId } = require("mongoose");
const RequestError = require("../helpers/requestError");

const idValidation = (req, _, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    const error = RequestError(400, `${contactId} is not corrent id format`);
    next(error);
  }
  next();
};

module.exports = idValidation;
