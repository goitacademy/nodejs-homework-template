const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async (req, res, next) => {
  const contacts = await fs.readFile(contactsPath);
  const data = JSON.parse(contacts);
  return data;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [contactToRemove] = allContacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return contactToRemove;
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  allContacts[idx] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return allContacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
