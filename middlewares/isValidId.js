const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../utils");

const isValidId = (request, response, next) => {
  const { id } = request.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not a valid`));
  }
  next();
};

module.exports = isValidId;
