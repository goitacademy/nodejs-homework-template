const { isValidObjectId } = require("mongoose");
const { customError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const isValid = isValidObjectId(id);
  if (!isValid) {
    throw customError(`id=${id} is not correct`, 400);
  }
  next();
};

module.exports = isValidId;
