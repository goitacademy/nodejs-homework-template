const listContacts = require("./listContacts");

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = await contacts.find(({ id }) => id === contactId.toString());

  if (!result) {
    return null;
  }

  return result;
}

module.exports = getContactById;
