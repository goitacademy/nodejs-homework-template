const fs = require('fs/promises');
const path = require('path');
const { v4: uuid } = require('uuid');

const contactsPath = path.join(__dirname, './contacts.json');

const readContacts = async path => {
  const contacts = await fs.readFile(path);
  return JSON.parse(contacts);
};

const writeContacts = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
};

const listContacts = async () => {
  return await readContacts(contactsPath);
};

const getContactById = async contactId => {
  const contacts = await readContacts(contactsPath);
  return contacts.find(contact => contact.id === contactId);
};

const addContact = async body => {
  const id = uuid();
  const newContact = {
    id,
    ...body,
  };

  const contacts = await readContacts(contactsPath);
  contacts.push(newContact);
  await writeContacts(contactsPath, contacts);

  return newContact;
};

const removeContact = async contactId => {
  const contacts = await readContacts(contactsPath);
  const requestedContactIdx = contacts.findIndex(contact => contact.id === contactId);

  if (requestedContactIdx === -1) {
    return null;
  }

  const removedContact = contacts.splice(requestedContactIdx, 1);
  await writeContacts(contactsPath, contacts);

  return removedContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readContacts(contactsPath);
  const contactToUpdate = contacts.find(contact => contact.id === contactId);

  if (contactToUpdate) {
    Object.assign(contactToUpdate, body);
    await writeContacts(contactsPath, contacts);
  }

  return contactToUpdate;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};