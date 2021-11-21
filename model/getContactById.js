/* eslint-disable semi */
/* eslint-disable quotes */
const listContacts = require("./listContacts");

// getContactById - получить контакт по id.
const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find(
    (contact) => contact.id === Number(contactId)
  );
  if (!result) {
    return null;
  }
  return result;
};

module.exports = getContactById;
