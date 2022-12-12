const { isValidObjectId } = require("mongoose");
const { BadRequest } = require("http-errors");

function isValidId(req, res, next) {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    throw new BadRequest(`${contactId} is not correct id format`);
  }
  next();
}

module.exports = isValidId;
