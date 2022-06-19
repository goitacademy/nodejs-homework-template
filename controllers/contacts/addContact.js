const { createError } = require("../../helpers");
const contacts = require("../../models/contacts");
const { contactsAddSchema } = require("../../schemas/contacts");

const addContact = async (req, res) => {
  const { error } = contactsAddSchema.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
