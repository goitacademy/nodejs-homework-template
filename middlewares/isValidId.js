const { isValidObjectId } = require("mongoose");
const { HTTPError } = require("../helpers");
const isValidId = (requirement, response, next) => {
  const { contactId } = requirement.params;
  if (!isValidObjectId(contactId)) {
    next(HTTPError(400, `${contactId} is not valid id`));
  }
  next();
};
module.exports = isValidId;
