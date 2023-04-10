const fs = require("fs/promises");
const path = require("path");
const encoding = "utf8";
const contactsPath = path.join(__dirname, "./contacts.json");
const readContacts = async () => {
  const contacts = await fs.readFile(contactsPath, encoding);
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
};

const listContacts = async () => {
  return readContacts();
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  const [deletedContact] = contacts.splice(index, 1);
  console.log(deletedContact);
  return deletedContact;
};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
