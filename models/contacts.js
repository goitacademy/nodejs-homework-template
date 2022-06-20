const fs = require('fs/promises')
const path = require("path");
const { v4 } = require("uuid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const existingContacts = await listContacts();
  const result = existingContacts.find(contact => contact.id === `${contactId}`);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const existingContacts = await listContacts();
  const existingIndex = existingContacts.findIndex(contact => contact.id === `${contactId}`);
  if (existingIndex < 0) {
    return null;
  }
  const remainingContacts = existingContacts.filter(contact => contact.id !== `${contactId}`);
  await fs.writeFile(contactsPath, JSON.stringify(remainingContacts));
  return existingContacts[existingIndex];
};

const addContact = async (body) => {
  const
    { name,
      email,
      phone,
    } = body;
  
  const existingContacts = await listContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  }
  const newContactsArray = [...existingContacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContactsArray));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const existingContacts = await listContacts();
  const existingIndex = existingContacts.findIndex(contact => contact.id === `${contactId}`);
  if (existingIndex < 0) {
    return null;
  }

  const updatedContact = { ...existingContacts[existingIndex], ...body };
  existingContacts[existingIndex] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(existingContacts));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
