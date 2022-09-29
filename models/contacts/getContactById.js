const listContacts = require("./listContacts");

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find(contact => contact.id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
}

module.exports = getContactById;
