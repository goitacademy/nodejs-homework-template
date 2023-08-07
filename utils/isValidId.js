const { isValidObjectId } = require("mongoose");
const AppError = require("./appError");

const isValidId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new AppError(400, `${id} is not valid Id`);
  }
  next();
};

module.exports = isValidId;
