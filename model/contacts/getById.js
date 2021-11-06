const listContacts = require("./getAll");

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((cont) => cont.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

module.exports = getContactById;
