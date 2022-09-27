const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");
const { contactSchema } = require("../../schemas/contactSchema");

const addContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw RequestError(400, "Missing fields");
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
