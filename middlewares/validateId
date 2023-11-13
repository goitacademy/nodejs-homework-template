const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const validateId = (req, res, next) => {
  if (!isValidObjectId(req.params.contactId)) {
    next(HttpError(400, `${req.params.contactId} is not a valid id`));
  }
  next();
};

module.exports = validateId;
