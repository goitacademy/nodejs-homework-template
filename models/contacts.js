const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, './contacts.json');

console.log(contactsPath);

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);

  return JSON.parse(result);
};

const getContactById = async id => {
  const contactsList = await listContacts();
  const contactEl = contactsList.find(el => el.id === id);

  if (!contactEl) {
    throw new Error({ message: 'Not found' });
  }
  return contactEl;
};

const removeContact = async id => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(el => el.id === id);

  if (index === -1) {
    throw new Error({ message: 'Not found' });
  }

  const [result] = contactsList.splice(index, 1);

  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

  return result;
};

const addContact = async (name, email, phone) => {
  const contactsList = await listContacts();
  const newContactEl = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  contactsList.push(newContactEl);

  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

  return newContactEl;
};

const updateContact = async (id, name, email, phone) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(el => el.id == id);

  contactsList[index].name = name;
  contactsList[index].email = email;
  contactsList[index].phone = phone;

  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

  return contactsList[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
