const { isValidObjectId } = require("mongoose");

const { createError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const result = isValidObjectId(id);
  if (!result) {
    const error = createError(400, "Invalid id");
    return next(error);
  }
  next();
};

module.exports = isValidId;
