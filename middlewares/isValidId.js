const { isValidObjectId } = require("mongoose");

const { httpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  if (!isValidObjectId(id)) {
    next(httpError(400, `${id} is not a valid id`));
  }
  next();
};

module.exports = { isValidId };
