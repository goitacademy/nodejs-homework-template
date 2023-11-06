const { isValidObjectId } = require("mongoose");
const HttpError = require("../helpers/HttpError");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId.slice(1))) {
    next(HttpError(400, `${contactId.slice(1)} is not valid id`));
  }
  next();
};

module.exports = isValidId;
