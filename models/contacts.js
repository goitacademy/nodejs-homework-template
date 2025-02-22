const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsFilePath = path.join(__dirname, 'contacts.json');

function readContactsFile() {
  try {
    const data = fs.readFileSync(contactsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts file:', error);
    return [];
  }
}

function writeContactsFile(data) {
  try {
    fs.writeFileSync(contactsFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing contacts file:', error);
  }
}

function listContacts() {
  return readContactsFile();
}

function getById(id) {
  const contacts = readContactsFile();
  return contacts.find(contact => contact.id === id);
}

function addContact(contact) {
  const contacts = readContactsFile();
  const newContact = { id: uuidv4(), ...contact };
  contacts.push(newContact);
  writeContactsFile(contacts);
  return newContact;
}

function removeContact(id) {
  let contacts = readContactsFile();
  const initialLength = contacts.length;
  contacts = contacts.filter(contact => contact.id !== id);
  if (contacts.length !== initialLength) {
    writeContactsFile(contacts);
    return true;
  }
  return false;
}

function updateContact(id, newData) {
  let contacts = readContactsFile();
  const index = contacts.findIndex(contact => contact.id === id);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...newData };
    writeContactsFile(contacts);
    return contacts[index];
  }
  return null;
}

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact
};



