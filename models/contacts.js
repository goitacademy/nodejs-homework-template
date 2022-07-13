const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  return contactById;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const newList = contacts.filter((item) => item.id !== contactId);
  if (!newList) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
  return newList;
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
