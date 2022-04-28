const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

const getContactById = async id => {
  const allContacts = await listContacts();
  const result = allContacts.find(item => item.id === id);
  if (!result) {
    return null;
  }

  return result;
};

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();

  const newContact = { id: v4(), name, email, phone };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return newContact;
};

const removeContact = async id => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(item => item.id === id);

  if (index === -1) {
    return null;
  }

  const [removeContact] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return removeContact;
};

const updateContact = async (id, name, email, phone) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }

  allContacts[index] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
