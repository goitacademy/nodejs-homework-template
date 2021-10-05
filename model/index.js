const fs = require('fs/promises');
const contacts = require('./contacts.json');
const { v4 } = require('uuid');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => contacts;

const getContactById = async id => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id.toString() === id);
  if (idx === -1) {
    return null;
  }
  return contacts[idx];
};

const removeContact = async id => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id.toString() === id);
  if (idx === -1) {
    return null;
  }
  contacts.splice(idx, 1);
  await updateContacts(contacts);
  return true;
};

const addContact = async data => {
  const newContact = { ...data, id: v4() };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContacts = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const updateById = async (id, data) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id.toString() === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...contacts[idx], ...data };
  await updateContacts(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
  updateById,
};
