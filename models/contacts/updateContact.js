const fs = require("fs/promises");

const listContacts = require("./listContacts");
const filePath = require("./filePath");

async function updateContact(contactId, body) {
  const contacts = await listContacts();

  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return contacts[index];
}

module.exports = updateContact;
