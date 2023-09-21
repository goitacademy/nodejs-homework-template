const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../utils/index");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw HttpError(400, `${id} is not valid id`);
  }
  next();
};

module.exports = isValidId;
