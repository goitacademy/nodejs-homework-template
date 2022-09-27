const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, '../models/contacts.json');

const reWriteFile = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const getAll = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async id => {
  const contacts = await getAll();
  const contactById = contacts.find(item => item.id === String(id));
  return contactById || null;
};

const removeContact = async id => {
  const list = await getAll();
  const index = list.findIndex(item => item.id === String(id));
  if (index === -1) {
    return null;
  }
  const [updatedContacts] = list.splice(index, 1);
  await reWriteFile(list);
  return updatedContacts;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await getAll();
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
  const contacts = await getAll();
  const index = contacts.findIndex(item => item.id === String(id));
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await reWriteFile(contacts);
  return contacts[index];
};

module.exports = {
  getAll,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
