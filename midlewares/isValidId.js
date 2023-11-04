const { isValidObjectId } = require("mongoose");

const createError = require("../helpers/createError");
const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(createError(400, `${contactId} is not valid id`));
  }
  next();
};
module.exports = isValidId;
