const { isValidObjectId } = require("mongoose");

const { requestError } = require("../helpers");
const isValidId = (req, res, next) => {
  const { id } = req.params;
  const isCorrectId = isValidObjectId(id);
  if (!isCorrectId) {
    next(requestError(400, `${id} is not valid id`));
  }
  next();
};

module.exports = isValidId;
