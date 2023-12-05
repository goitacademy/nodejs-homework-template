const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValid = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw HttpError(404, `${contactId} is invalid user ID`);
  }
  next();
};

module.exports = isValid;
