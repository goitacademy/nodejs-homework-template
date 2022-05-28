const Contact = require("../../model");

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId);
  return result;
};

module.exports = removeContact;
