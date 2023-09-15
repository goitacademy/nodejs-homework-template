const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../utils/HttpError.js");

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return next(HttpError(404, `${id} is not a valid id`));
  }
  next();
};

module.exports = validateId;
