const { isValidObjectId } = require("mongoose");

const HttpError = require("../Helpers/HttpError");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw new HttpError(400, `${contactId} is not valid id`);
  }
  next();
};
module.exports = isValidId;
