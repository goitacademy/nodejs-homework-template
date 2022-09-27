const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");
const { contactSchema } = require("../../schemas/contactSchema");

const updateContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw RequestError(404, "Not Found");
  }
  res.json(result);
};

module.exports = updateContact;
