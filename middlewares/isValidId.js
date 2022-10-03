const { isValidObjectId } = require("mongoose");
const { RequsetError } = require("../helpers/");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const result = isValidObjectId(id);
  if (!result) {
    next(RequsetError(404, `${id} is not valid`));
  }
  next();
};

module.exports = isValidId;
