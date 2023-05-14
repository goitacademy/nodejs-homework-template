const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');
const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async id => {
  const data = await listContacts();
  const result = data.find(contatc => contatc.id === id);
  return result || null;
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
};

const updById = async (id, name, email, phone) => {
  const data = await listContacts();
  const index = data.findIndex(el => el.id === id);
  if (index === -1) {
    return null;
  }
  data[index] = {
    id,
    name,
    email,
    phone,
  };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[index];
};

const removeContact = async id => {
  const data = await listContacts();
  const removeIndex = data.findIndex(el => el.id === id);
  if (removeIndex === -1) {
    return null;
  }
  const [deletedContact] = data.splice(removeIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return deletedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updById,
};
