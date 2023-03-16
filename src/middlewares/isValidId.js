const { isValidObjectId } = require("mongoose");
const { BadRequest } = require("http-errors");

const isValidId = (req, _, next) => {
  const { id } = req.params;
  const isCorrectId = isValidObjectId(id);
  if (!isCorrectId) {
    next(new BadRequest(`${id} is not correct id format`));
  }
  next();
};

module.exports = { isValidId };
