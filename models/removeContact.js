const fs = require("fs").promises;
const path = require("path");
const listContacts = require('./listContacts');

const contactsPath = path.join(__dirname, '..', 'db', "contacts.json");

const removeContact = async (contactId) => {
  const parsedContacts = await listContacts();

  const newList = parsedContacts.filter((contact) => contact.id !== contactId);

  if (parsedContacts.length === newList.length) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(newList, null, "\t"), "utf8");

  const contactsAfterRemove = await fs.readFile(contactsPath, "utf8");

  return JSON.parse(contactsAfterRemove);
};

module.exports = removeContact;
