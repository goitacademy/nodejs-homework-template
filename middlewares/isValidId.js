const HttpError = require("../helpers/HttpError.js");

const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(HttpError(404, `${contactId} not valid id`));
  }
  next();
};

module.exports = isValidId;
