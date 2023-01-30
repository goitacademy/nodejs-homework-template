const fs = require("fs/promises");
const contactDdbPath = require("./dbPath");
const get = require("./get");

async function remove(contactId) {
  const contacts = await get();

  const newContacts = contacts.filter(
    (contact) => contact.id !== String(contactId)
  );

  if (contacts.length === newContacts.length) {
    return null;
  }
  await fs.writeFile(contactDdbPath, JSON.stringify(contacts, null, 2));
  return newContacts;
}

module.exports = remove;
