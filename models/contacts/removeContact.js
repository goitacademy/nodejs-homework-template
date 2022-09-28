const fs = require("fs/promises");

const listContacts = require("./listContacts");
const filePath = require("./filePath");

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const deletedContact = contacts.splice(index, 1);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return deletedContact;
}

module.exports = removeContact;
