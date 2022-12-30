const { isValidObjectId } = require("mongoose");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    const error = new Error(`contact with id "${contactId}" is not found`);
    error.status = 404;
    next(error);
  }
  next();
};

module.exports = isValidId;
