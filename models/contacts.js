const path = require('path');
const fs = require('fs/promises');
const { createId } = require('../helpers');

const pathContacts = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(pathContacts);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const res = contacts.find((option) => option.id === contactId);
  return res || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));

  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  console.log(typeof createId(contacts));
  const newContact = {
    id: createId(contacts),
    ...body,
  };
  contacts.push(newContact);

  await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));
  // console.log(newContact);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
