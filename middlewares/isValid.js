const { isValidObjectId } = require("mongoose");

const { HttpErrors } = require("../helpers");

const isValid = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpErrors(400, `${id} is not valid Id`));
  }
  next();
};

module.exports = isValid;
