const Contact = require("../../models/contacts");

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

module.exports = getContactById;
