const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(new HttpError(404, `${contactId} is not a valid id`));
  }
  next();
};

module.exports = isValidId;
