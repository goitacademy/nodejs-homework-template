const { isValidObjectId } = require("mongoose");

const { createError } = require("../helpers");

const validationId = (req, res, next) => {
  const { id } = req.params;
  const isValid = isValidObjectId(id);
  if (!isValid) {
    next(createError(404, "Invalid id"));
    return;
  }
  next();
};

module.exports = validationId;
