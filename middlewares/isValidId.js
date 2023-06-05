const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

function isValidId(req, _, next) {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(404, `'${contactId}' invalid format of ID parameter`));
  }
  next();
}

module.exports = isValidId;
