const { isValidObjectId } = require("mongoose");
const HttpError = require("../helper/HttpError");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId) {
    next(HttpError(404, `${id} is not valid id`));
  }
  next();
};

module.exports = isValidId;
