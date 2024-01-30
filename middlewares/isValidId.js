const { isValidObjectId } = require("mongoose");
const HttpError = require("../utils/HttpError");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw HttpError(400, `${contactId} not valid id`);
  }
  next();
};

module.exports = {
  isValidId,
};
