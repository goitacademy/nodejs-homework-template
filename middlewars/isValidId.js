const { isValidObjectId } = require("mongoose");

const HttpErr = require("../helpers/HttpError.js");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(HttpErr(404, `${contactId} not correct`));
  }
  next();
};

module.exports = isValidId;
