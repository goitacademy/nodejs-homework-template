const createError = require("../../helpers/createError");
const schemaId = require("../createIdSchema");

function validateId(req, _, next) {
  const { error } = schemaId.validate(req.params.contactId);
  if (error) {
    throw createError(400, error.message);
  }
  next();
}

module.exports = validateId;
