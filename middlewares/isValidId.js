const { isValidObjectId } = require("mongoose");
const { HTTPError } = require("../helpers");
const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HTTPError(400, `${contactId} is not valid id`));
  }
  next();
};
module.exports = isValidId;
