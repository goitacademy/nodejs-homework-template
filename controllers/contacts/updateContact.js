const contacts = require("../../models/contacts");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = req.body;
  const result = await contacts.updateContact(contactId, updatedContact);

  return res.json(result);
};

module.exports = updateContact;
