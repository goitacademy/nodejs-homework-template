const { isValidObjectId } = require("mongoose");

const HttpError = require("../utils/HttpError");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `id:${contactId} is not valid`));
  }
  next();
};

module.exports = isValidId;
