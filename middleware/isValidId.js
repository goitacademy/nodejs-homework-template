const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  if (!isValidObjectId(req.params.contactId)) {
    next(HttpError(404, "Invalid id"));
  }
  next();
};

module.exports = isValidId;
