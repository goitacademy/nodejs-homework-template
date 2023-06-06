const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const validId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `${contactId} is not valid id`));
  }
  next();
};

module.exports = validId;
