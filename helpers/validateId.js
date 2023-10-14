const mongoose = require("mongoose");
const httpError = require("./httpError.js");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    next(httpError(400, `${id} is not a valid id`));
  }
  next();
};

module.exports = isValidId;