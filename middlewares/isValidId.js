const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (requirement, response, next) => {
  const { contactId } = requirement.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `${contactId} is not valid ID`));
    }
    next()
};

module.exports = isValidId;