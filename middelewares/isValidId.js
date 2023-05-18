const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    next(HttpError(404, "Invalid id"));
  }
  next();
};

module.exports = isValidId;
