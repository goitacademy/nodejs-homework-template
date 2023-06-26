const { isValidObjectId } = require("mongoose");
// из mongoose берем свойство isValidObgectId у mongoose
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(404, `${id} invalid format for id`));
  }
  next();
};
module.exports = isValidId;
