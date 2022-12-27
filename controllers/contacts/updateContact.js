const contactsOperations = require('../../models/contacts');

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await contactsOperations.updateContact(contactId, req.body);
  res.json(updateContact);
}

module.exports = updateContact;