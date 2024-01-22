const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (request, response, next) => {
  const { contactId } = request.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `${contactId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
