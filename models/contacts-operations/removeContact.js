const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "..", "data", "contacts.json");
const getContacts = require("./getContacts");

const removeContact = async (id) => {
  const contacts = await getContacts();

  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  const [removed] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));

  return removed;
};

module.exports = removeContact;
