const isValidObjectId = require("mongoose");

const { handleHttpError } = require("../utils");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(handleHttpError(400, `${id} is not valid id`));
  }
  next();
};

module.exports = isValidId;
