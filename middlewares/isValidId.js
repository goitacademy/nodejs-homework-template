const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");

const isValidId = (req, res, next) => {
  const id = req.params.contactId;
  if (!isValidObjectId(id)) {
    return next(createError(400, `${id} is not valid id`));
  }
  next();
};

module.exports = isValidId;
