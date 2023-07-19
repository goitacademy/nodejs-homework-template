const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);
  const contacts = JSON.parse(allContacts);
  return contacts;
};

const getContactById = async (id) => {
  const allContacts = await fs.readFile(contactsPath);
  const contacts = JSON.parse(allContacts);
  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) {
    return null;
  }
  return contact;
};

const updateContact = async (id, body) => {
  const allContacts = await fs.readFile(contactsPath);
  const contacts = JSON.parse(allContacts);
  const indexEl = contacts.findIndex((contact) => contact.id === id);
  if (indexEl === -1) {
    return null;
  }
  contacts[indexEl] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[indexEl];
};

const removeContact = async (id) => {
  const allContacts = await fs.readFile(contactsPath);
  const contacts = JSON.parse(allContacts);
  const indexEl = contacts.findIndex((contact) => contact.id === id);
  if (indexEl === -1) {
    return null;
  }
  const newListContacts = contacts.filter((_, index) => index !== indexEl);
  fs.writeFile(contactsPath, JSON.stringify(newListContacts));
  return contacts[indexEl];
};

const addContact = async (name, email, phone) => {
  const allContacts = await fs.readFile(contactsPath);
  const contacts = JSON.parse(allContacts);
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
