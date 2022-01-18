const listContacts = require("./listContacts");

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);

  return contact || null;
};

module.exports = getContactById;
