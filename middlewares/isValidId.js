const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id, contactId } = req.params;

  const validId = id || contactId;

  if (!isValidObjectId(validId)) {
    next(HttpError(400, `${validId} is not a valid id`));
  } else {
    next();
  }
};

module.exports = isValidId;
