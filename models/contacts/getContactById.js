const listContacts = require("./listContacts");

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  return result;
};

module.exports = getContactById;
