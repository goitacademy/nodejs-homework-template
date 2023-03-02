const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const isValid = isValidObjectId(id);
  if (!isValid) {
    const error = new Error(`id=${id} is not correct`);
    error.status = 400;
    next(error);
  }
  next();
};

module.exports = isValidId;
