const getAllContacts = require("./getAllContacts");

const getContactById = async (contactId) => {
  const contacts = await getAllContacts();
  const result = await contacts.find(
    (contact) => contact.id === Number(contactId) || contact.id === contactId
  );
  if (!result) {
    return null;
  }
  return result;
};

module.exports = getContactById;
