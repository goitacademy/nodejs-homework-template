const listContacts = require("./listContacts");

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => contactId === id);

  if (!contact) return null;

  return contact;
};

module.exports = getContactById;
