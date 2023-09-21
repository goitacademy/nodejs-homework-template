const mongoose = require("mongoose");
const HttpError = require("../helpers/httpError");

const isValidId = (req, res, next) => {
  const { contactId } = req.params.id;
  if (!mongoose.isValidObjectId(contactId)) {
    return next(new HttpError(404, `ID ${id} is not a valid one`));
  }
  next();
};

module.exports = isValidId;
