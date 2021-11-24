const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises')
const contactsPath = require('./contactsPath')

const listContacts = async () => {
  const contactsData = await fs.readFile(contactsPath, 'utf-8')
  return JSON.parse(contactsData);
};

const getContactById = async (contactId) => {
  const contactsData = await listContacts();
  return contactsData.find(contact => contact.id === Number(contactId))
};

const removeContact = async (contactId) => {
  const contactsData = await listContacts();
  const newContactsList = contactsData.filter(contact => contact.id === Number(contactId));
  const contactFindById = contactsData.find(contact => contact.id === Number(contactId))
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList, null, 2))
  return contactFindById;
};

const addContact = async (name, email, phone) => {
  const contactsData = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone }
  contactsData.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contactsData, null, 2), 'utf-8')

  return contactsData;
};

const updateContact = async (contactId, body) => {
  const contactsData = await listContacts();
  const idx = contactsData.findIndex(contact => contact.id === Number(contactId));
    if (idx === -1) {
      return null;
    }
 
  contactsData[idx] = { id: Number(contactId), ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactsData), 'utf-8');
  return contactsData[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
