const mongoose = require("mongoose");
const HttpError = require("../helpers/httpError");

const isValidId = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return next(new HttpError(404, `ID ${id} is not a valid one`));
  }
  next();
};

module.exports = isValidId;
