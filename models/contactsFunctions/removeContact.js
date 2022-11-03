const fs = require("fs/promises");
const listContacts = require("./listContacts");
const contactsPath = require("./contactsPath");

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId.toString());

  if (idx === -1) {
    return null;
  }

  const [removeContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return removeContact;
}

module.exports = removeContact;
