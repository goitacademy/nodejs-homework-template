const createError = require("../helpers/createError");
const createResponse = require("../helpers/createResponse");
const { updateContact } = require("../models/contacts");
const contactSchema = require("../validation/schema");

async function update(req, res, next) {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) throw createError(400, error.message);

    const result = await updateContact(req.params.contactId, req.body);
    if (!result) throw createError(404);

    createResponse(200, res, result);
  } catch (error) {
    next(error);
  }
}

module.exports = update;
