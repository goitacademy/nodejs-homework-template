const { isValidObjectId } = require("mongoose");

const createError = require("../helpers/createError");
const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(createError(400, `${id} is not valid id`));
  }
  next();
};
module.exports = isValidId;
