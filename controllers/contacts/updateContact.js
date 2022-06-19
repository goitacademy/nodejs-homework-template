const { createError } = require("../../helpers");
const contacts = require("../../models/contacts");
const { contactsAddSchema } = require("../../schemas/contacts");

const updateContact = async (req, res) => {
  const { error } = contactsAddSchema.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateContact;
