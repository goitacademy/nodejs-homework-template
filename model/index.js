const fs = require('fs/promises');
const path = require('path');
const { v4: uuid } = require('uuid');

// const contacts = require('./contacts.json');

const contactsPath = path.join(__dirname, '../model/contacts.json');
const contactsList = fs.readFile(contactsPath, 'utf8');

const listContacts = async () => {
  return JSON.parse(await contactsList);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => String(id) === contactId);
  return contact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const contactRemove = contacts.filter(({ id }) => String(id) !== contactId);

  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactRemove, null, 2),
    'utf-8',
  );
  return contactRemove;
};

const addContact = async body => {
  const contacts = await listContacts();
  const id = uuid();
  const newContact = { id, ...body };
  const newContactsList = [...contacts, newContact];
  await fs.writeFile(
    contactsPath,
    JSON.stringify(newContactsList, null, 2),
    'utf-8',
  );
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => String(id) === contactId);
  const updateContact = { ...contact, ...body };
  const updateContactList = contacts.map(obj =>
    String(obj.id) === contact.id ? updateContact : obj,
  );
  await fs.writeFile(
    contactsPath,
    JSON.stringify(updateContactList, null, 2),
    'utf-8',
  );
  return updateContactList;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
