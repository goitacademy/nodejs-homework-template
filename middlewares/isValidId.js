const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId) {
    next(HttpError(400, `${id} is not valid Id`));
  }
  next();
};

module.exports = isValidId;
