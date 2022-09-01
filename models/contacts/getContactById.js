const getListContacts = require("./getListContacts");

const getContactById = async (contactId) => {
  const contacts = await getListContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  if (!contact) return null;
  return contact;
};

module.exports = getContactById;
