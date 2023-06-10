const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  return result || null;
}

const removeContact = async (contactId) => {
   const contacts = await listContacts();
  const contactToRemoveIndex = contacts.findIndex(item => item.id === contactId);
  if (!contactToRemoveIndex) {
    return null;
  }
  const [deletedContact] = contacts.splice(contactToRemoveIndex, 1);
  console.log(deletedContact, 'deletedContact-------------------------')
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null , 2));
  return deletedContact;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const contactToAdd = {
    id: uuidv4(),
    ...body
  }
  contacts.push(contactToAdd);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contactToAdd;
}

const updateContact = async (contactId, body) => {
   const contacts = await listContacts();
  const contactToUpdateIndex = contacts.findIndex(item => item.id === contactId);

  if (contactToUpdateIndex === -1) {
    return null;
  }

  contacts[contactToUpdateIndex] = { id:contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[contactToUpdateIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
