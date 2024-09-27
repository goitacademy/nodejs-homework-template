const contacts = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw RequestError(404);
  }
  res.status(201).json(result);
};

module.exports = updateContact;
