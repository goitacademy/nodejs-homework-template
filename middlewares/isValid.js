const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValid = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400, "Not found"));
  }
  next();
};

module.exports = isValid;
