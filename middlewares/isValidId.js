const { isValidObjectId } = require("mongoose");

const { createError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const result = isValidObjectId(id);
  if (!result) {
    next(createError(400, "Invalid id format"));
  }
  next();
};

module.exports = isValidId;
