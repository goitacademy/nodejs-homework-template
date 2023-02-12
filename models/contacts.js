const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const contacts = await parseData();
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await parseData();
  const result = contacts.find(contact => contact.id === contactId);

  if (!result) return null;
  return result;
};

const addContact = async body => {
  const contacts = await parseData();

  const data = { id: v4(), ...body };
  contacts.push(data);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return data;
};

const updateContact = async (contactId, body) => {
  const contacts = await parseData();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) return null;

  contacts[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];
};

const removeContact = async contactId => {
  const contacts = await parseData();
  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index === -1) return null;

  const [contactDeleted] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contactDeleted;
};

async function parseData() {
  const data = await fs.readFile(contactsPath, 'utf8');
  const contacts = JSON.parse(data);
  return contacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
