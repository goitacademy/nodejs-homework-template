/*// const fs = require('fs/promises')
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Importa uuidv4 de la biblioteca uuid

const contactsFilePath = path.join(__dirname, 'contacts.json');

const readContactsFile = () => {
  const data = fs.readFileSync(contactsFilePath, 'utf8');
  return JSON.parse(data);
};

const writeContactsFile = (contacts) => {
  fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));
};

const addContact = (contact) => {
  const contacts = readContactsFile();
  const newContact = { id: uuidv4(), ...contact }; // Genera un nuevo UUID
  contacts.push(newContact);
  writeContactsFile(contacts);
  return newContact;
};

const listContacts = () => {
  return readContactsFile();
};

const getContactById = (id) => {
  const contacts = readContactsFile();
  return contacts.find((contact) => contact.id === id);
};

const updateContact = (id, updatedData) => {
  const contacts = readContactsFile();
  const contactToUpdate = contacts.find((contact) => contact.id === id);


  if (!contactToUpdate) {
    return null;
  }

  Object.assign(contactToUpdate, updatedData);
  writeContactsFile(contacts);
  return contactToUpdate;
};

const removeContact = (id) => {
  const contacts = readContactsFile();
  const indexToRemove = contacts.findIndex((contact) => contact.id === id);

  if (indexToRemove === -1) {
    return false;
  }

  contacts.splice(indexToRemove, 1);
  writeContactsFile(contacts);
  return true;
};


module.exports = {
  addContact,
  listContacts,
  getContactById,
  updateContact,
  removeContact,
};