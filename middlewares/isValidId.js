const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    const error = res
      .status(400)
      .json(` id=${contactId} is not correct id format`);
    next(error);
  }
  next();
};

module.exports = isValidId;
