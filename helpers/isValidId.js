const { isValidObjectId } = require("mongoose");
const createError = require("./createError");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);

  if (!result) {
    const error = createError(400, "Invalid id");

    return next(error);
  }
  next();
};

module.exports = isValidId;
