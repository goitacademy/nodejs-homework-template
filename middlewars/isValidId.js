const { isValidObjectId } = require("mongoose");

const { requestError } = require("../helpers");

const isValidId = (req, _, next) => {
  const { id } = req.params;
  const isCorrectId = isValidObjectId(id);
  if (!isCorrectId) {
    const error = requestError(422, `${id} is not corrent id format`);
    next(error);
  }
  next();
};

module.exports = isValidId;
