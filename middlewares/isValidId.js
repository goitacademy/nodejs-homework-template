const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");
const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    const error = createError(400, `Not correct  id=${contactId} `);
    next(error);
  }
  next();
};
module.exports = isValidId;
