// const fs = require('fs/promises')

const crypto = require('crypto');

const contactStorage = require('../models/contacts.json')

const listContacts = async () => {
  return await contactStorage
}

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
      await contactStorage(contacts);
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
    await contactStorage(contacts);
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
      await contactStorage(contacts);
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
}
