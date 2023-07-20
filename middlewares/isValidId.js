const { isValidObjectId } = require("mongoose");

const { generateHTTPError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(generateHTTPError(400, "Contact's id is don't valid"));
  }
  next();
};

module.exports = isValidId;
