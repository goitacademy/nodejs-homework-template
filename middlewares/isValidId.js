const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../helpers");

const isValidId = (req, _, next) => {
  if (!isValidObjectId(req.params.contactId)) {
    next(RequestError(404, "Not found"));
  }
  next();
};

module.exports = isValidId;
