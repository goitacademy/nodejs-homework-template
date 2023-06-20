const { isValidObjectId } = require("mongoose");

const isValidId = (req, _, next) => {
  const { id } = req.params;
  const isCorrectId = isValidObjectId(id);
  if (!isCorrectId) {
    const error = 400;
    next(error);
  }
  next();
};

module.exports = isValidId;
