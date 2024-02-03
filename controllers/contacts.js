const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const contactsStorage = path.join(__dirname, '../db/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsStorage, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const saveContacts = async (contacts) => {
  try {
    await fs.writeFile(contactsStorage, JSON.stringify(contacts, null, 2), 'utf-8');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(u => u.id == contactId);
    return contact;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((u) => u.id == contactId);

    if (index > -1) {
      contacts.splice(index, 1);
      await saveContacts(contacts);
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: crypto.randomUUID(),
      ...body,
    };
    contacts.push(newContact);
    await saveContacts(contacts);
    return newContact;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...body };
      await saveContacts(contacts);
      return contacts[index];
    }

    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
