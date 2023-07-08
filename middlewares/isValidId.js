const { isValidObjectId } = require("mongoose");
const { HttpErrors } = require("../helpers/HttpError");

const isValidId = (req, res, next) => {
  if (!isValidObjectId(req.params)) {
    next(HttpErrors(400, `${req.params} is not valid id`));
  }

  next();
};

module.exports = isValidId;
