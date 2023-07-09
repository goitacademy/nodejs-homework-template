const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers/HttpError");

const isValidId = (req, res, next) => {
  if (!isValidObjectId(req.params)) {
    next(HttpError(400, `${req.params} is not valid id`));
  }

  next();
};

module.exports = isValidId;
