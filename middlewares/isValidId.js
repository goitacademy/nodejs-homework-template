const { isValidObjectId } = require("mongoose");
const { BadRequest } = require("http-errors");

const isValidId = (req, _, next) => {
  const { id } = req.params;
  const isCorrectId = isValidObjectId(id);
  if (!isCorrectId) {
    const error = BadRequest(`${id} has the wrong id format`);
    next(error);
  }
  next();
};

module.exports = isValidId;