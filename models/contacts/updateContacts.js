const listContacts = require("./listContacts");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "../../db/contacts.json");
const updateContact = async (contactId, name, email, phone) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  contacts[index] = { id: contactId, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};
module.exports = updateContact;
