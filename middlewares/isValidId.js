const { isValidObjectId } = require("mongoose");
const HttpError = require("../Helpers/HttpError");

const isValidId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    next(HttpError(400, "Invalid id"));
  }
  next();
};

module.exports = isValidId;
