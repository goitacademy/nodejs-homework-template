const contacts = require("../../models/contacts");
const { createError } = require("../../helpers");
const schemas = require("../../schemas/contacts");

const updateContact = async (req, res) => {
  const { error } = schemas.updateContact.validate(req.body);
  if (error) {
    throw createError(400, "missing fields");
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateContact;
