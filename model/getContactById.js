const listContacts = require("./listContacts");

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const id = +contactId;
  const selectContact = contacts.find((contact) => contact.id === id);
  return selectContact;
};

module.exports = getContactById;
