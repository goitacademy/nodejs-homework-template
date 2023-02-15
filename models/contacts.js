const fs = require("fs/promises");
const path = require("path");
const uniqid = require("uniqid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const searchedContact = contacts.find((contact) => contact.id === id);
  if (!searchedContact) {
    return null;
  }
  return searchedContact;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const searchedContact = contacts.find((contact) => contact.id === id);
  const contactToDelete = contacts.indexOf(searchedContact);
  if (contactToDelete === -1) {
    return null;
  }
  const [splicedArr] = contacts.splice(contactToDelete, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return splicedArr;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { id: uniqid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
};

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
