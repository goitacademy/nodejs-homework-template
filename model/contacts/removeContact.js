const getContacts = require("./getContacts");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function removeContact(contactId) {
  const contacts = await getContacts();
  const newContacts = contacts.filter(
    (contact) => contact.id !== Number(contactId)
  );
  if (contacts.length === newContacts.length) {
    return -1;
  }
  try {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return newContacts;
  } catch (error) {
    return null;
  }
}

module.exports = removeContact;
