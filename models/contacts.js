const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    error.status = 500;
    error.message = 'Server error';
    throw error;
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);
    return result || null;
  } catch (error) {
    error.status = 500;
    error.message = 'Server error';
    throw error;
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const [deleted] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deleted;
  } catch (error) {
    error.status = 500;
    error.message = 'Server error';
    throw error;
  }
};

const addContact = async body => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...body,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    error.status = 500;
    error.message = 'Server error';
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const updateContact = { ...contacts[index], ...body };
    contacts[index] = updateContact;
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updateContact;
  } catch (error) {
    error.status = 500;
    error.message = 'Server error';
    throw error;
  }
};

module.exports = {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
};
