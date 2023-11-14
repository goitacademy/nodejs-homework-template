const { isValidObject } = require("mongoose");
const HttpError = require("../helpers/HttpError");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (isValidObject(id)) {
    next(HttpError(400, `${id} is not valid id`));
  }
  next();
};
module.exports = isValidId;
