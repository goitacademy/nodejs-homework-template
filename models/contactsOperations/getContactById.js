const listContacts = require("./listContacts");

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find((contact) => contact.id === contactId);

  return result || null;
};

module.exports = getContactById;
