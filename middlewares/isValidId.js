const RequestError = require("../helpers");
const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);
  if (!result) {
    next(RequestError(404, `${contactId} is not valid`));
  }
  next();
};

module.exports = isValidId;
