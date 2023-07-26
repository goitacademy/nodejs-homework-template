const { isValidObjectId } = require("mongoose");
const { HtthError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HtthError(400, `${id} is not valid id`));
  }
  next();
};

module.exports = isValidId;
