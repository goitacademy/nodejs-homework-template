const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const data = await listContacts();
  return findContactById(data, contactId);
}


const removeContact = async (contactId) => {
  const data = await listContacts();
  const newContacts = data.filter(contact => Number(contact.id) !== Number(contactId));
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return findContactById(data, contactId);
}

const addContact = async (body) => {
  const data = await listContacts();
  const id = nanoid();
  const newContact = { id, ...body };
  const newData = [...data, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const contactIndex = data.findIndex(contact => Number(contact.id) === Number(contactId));
  if (contactIndex === -1) {
    return null;
  }
  data[contactIndex] = { ...data[contactIndex], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[contactIndex];
}


function findContactById (data, contactId) {
  return data.find(contact => Number(contact.id) === Number(contactId));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
