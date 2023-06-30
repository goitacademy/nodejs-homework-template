const { isValidObjectId } = require("mongoose");
const errorHandler = require("./errorHandler");

const isIdValid = (req, res, next) => {
  const result = isValidObjectId(req.params.contactId);
  if (!result) {
    next(errorHandler(404));
  }

  next();
};

module.exports = isIdValid;
