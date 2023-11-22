const { isValidObjectId } = require("mongoose");

const HttpError = require("../helpers/HttpError");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} id nod valid`));
  }
  next();
};

module.exports = isValidId;
