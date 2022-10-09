const { isValidObjectId } = require("mongoose");

const { RequestError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const result = isValidObjectId(id);
  if (!result) {
    next(RequestError(404, `${id} is not valid id`));
  }
  next();
};

module.exports = isValidId;
