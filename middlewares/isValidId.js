const { isValidObjectId } = require("mongoose");
const { ApiError } = require("../helpers");
const isValidId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    next(ApiError(404, `${id} is not valid id`));
  }
  next();
};
module.exports = isValidId;
