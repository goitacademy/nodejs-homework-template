const { isValidObjectId } = require("mongoose");
const { HTTPError } = require("../utils");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HTTPError(404, `${contactId} is not valid Id`));
  }
  next();
};
module.exports = isValidId;
