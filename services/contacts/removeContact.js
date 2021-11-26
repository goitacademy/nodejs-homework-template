const Contact = require("../../models/contacts");

const removeContact = async (contactId) => {
  const removedContact = await Contact.findByIdAndRemove(contactId);
  return removedContact;
};

module.exports = removeContact;
