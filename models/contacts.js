const { v4 } = require('uuid');
const fs = require('fs/promises');
const contactsPath = require('./contactsPath.js');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
    const contact = contacts.find(item => item.id === contactId);
    if (!contact) {
        return null;
    }
    return contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
        return null;
    }
    const [removeContact] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removeContact;
}

const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
    const newContact = { id: v4(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}

const updateContact = async (contactId, {name, email, phone}) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === contactId);
  if (idx === -1) {
        return null;
  }
  contacts[idx] = { 'id': contactId, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
