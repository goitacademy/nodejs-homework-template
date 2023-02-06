const fs = require('fs/promises');
const dataPath = require('./getDataPath');
const { v4: uuidv4 } = require('uuid');

const listContacts = async () => {
  const data = await fs.readFile(dataPath);
  return JSON.parse(data);
};

const getContactById = async id => {
  const contactData = await fs.readFile(dataPath);
  const contacts = JSON.parse(contactData);

  const res = contacts.find(note => note.id === id);
  return res || null;
};

const removeContact = async id => {
  let contactList = await listContacts();
  const index = contactList.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }

  const removedContact = contactList[index];

  contactList = contactList.filter(contact => contact.id !== id);
  const newList = JSON.stringify(contactList);
  await fs.writeFile(dataPath, newList);

  return removedContact;
};

const addContact = async body => {
  const contactList = await listContacts();
  const id = uuidv4();
  const newContact = {
    id,
    name: body.name,
    email: body.email,
    phone: body.phone,
  };

  contactList.push(newContact);
  const newList = JSON.stringify(contactList);
  await fs.writeFile(dataPath, newList);

  return newContact;
};

const updateContact = async (id, body) => {
  const contactList = await listContacts();
  const index = contactList.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }

  contactList[index] = { id, ...body };
  const newList = JSON.stringify(contactList);
  await fs.writeFile(dataPath, newList);

  return contactList[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
