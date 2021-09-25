const getContacts = require("./getContacts");

async function getContactById(contactId) {
  const contacts = await getContacts();
  return contacts.find((contact) => contact.id === Number(contactId)) || null;
}

module.exports = getContactById;
