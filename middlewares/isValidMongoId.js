const { isValidObjectId } = require("mongoose");
const { httpError } = require("../helpers");

const isValidMongoId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(httpError(400, `${id} is not valid ID `));
  }
  next();
};

module.exports = isValidMongoId;
