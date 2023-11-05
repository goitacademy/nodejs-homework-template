const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(req)) {
    next(HttpError(400, `${id} is not valid id`));
  }
  next();
};

module.exports = isValidId;
