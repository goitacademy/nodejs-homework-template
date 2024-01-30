const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(
      HttpError(404, { message: `${contactId} is not valid id` }.message)
    );
  }

  return next();
};

module.exports = isValidId;
