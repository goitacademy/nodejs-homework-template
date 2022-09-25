const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, '../models/contacts.json');

const reWriteFile = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async id => {
  const contacts = await listContacts();
  const contactById = contacts.find(item => item.id === String(id));
  return contactById || null;
};

const removeContact = async id => {
  const list = await listContacts();
  const index = list.findIndex(item => item.id === String(id));
  if (index === -1) {
    return null;
  }
  const [updatedContacts] = list.splice(index, 1);
  await reWriteFile(list);
  return updatedContacts;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await reWriteFile(contacts);
  return newContact;
};

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === String(id));
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await reWriteFile(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
