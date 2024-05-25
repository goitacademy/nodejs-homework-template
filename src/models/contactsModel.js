const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsFilePath = path.join(__dirname, "../contacts.json");

const listContacts = () => {
  const data = fs.readFileSync(contactsFilePath, "utf8");
  return JSON.parse(data);
};

const getById = (id) => {
  const contacts = listContacts();
  return contacts.find((contact) => contact.id === id);
};

const addContact = (contact) => {
  const contacts = listContacts();
  const newContact = { id: uuidv4(), ...contact };
  contacts.push(newContact);
  fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = (id) => {
  let contacts = listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex !== -1) {
    contacts = contacts.filter((contact) => contact.id !== id);
    fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));
    return true;
  }
  return false;
};

const updateContact = (id, update) => {
  let contacts = listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex !== -1) {
    contacts[contactIndex] = { ...contacts[contactIndex], ...update };
    fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));
    return contacts[contactIndex];
  }
  return null;
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
