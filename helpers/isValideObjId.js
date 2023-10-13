const { isValidObjectId } = require("mongoose");
const errorHandler = require("./errorHandler");

const isValid = (req, _, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(errorHandler(400, `${id} is not valid id`));
  }
  next();
};
module.exports = isValid;
