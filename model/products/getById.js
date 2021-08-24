const listContacts = require("./getAll");

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const [contactById] = contacts.filter((contact) => contact.id === contactId);
  return contactById;
};

module.exports = getContactById;
