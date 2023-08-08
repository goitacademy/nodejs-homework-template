const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(HttpError(404, `Is not a valid id : ${id}`));
  }
  next();
};
module.exports = isValidId;
