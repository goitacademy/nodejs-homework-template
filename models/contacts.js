// const fs = require('fs/promises')
// import { promises as fs } from 'fs';
// import path from 'path';

const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    console.error('Error reading contacts.json:');
    throw error;
  }
};


const getContactById = async (contactId) => {
  console.log(contactId);
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const foundContact = contacts.find((contact) => contact.id === contactId);

    return foundContact || null;
  } catch (error) {
    console.error('Error in getContactById:', error.message);
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const foundContactIndex = contacts.findIndex(contact => contact.id === contactId);

    if (foundContactIndex === -1) {
      return null;
    }

    const removedContact = contacts.splice(foundContactIndex, 1)[0];

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return removedContact || null;
  } catch (error) {

  }
}

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    contacts.push(body);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  } catch (error) {
    console.error('Error in addContact:', error.message);
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const index = contacts.findIndex((contact) => contact.id === contactId);

  
    if (index === -1) {
      return { message: 'index Not found', status: 404};
    }

    if (!body || Object.keys(body).length === 0) {
      return { message: 'Missing fields', status: 400 };
    }

    contacts[index] = { ...contacts[index], ...body };

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return { contact: contacts[index], status: 200 };

  } catch (error) {
    console.error('Error in updateContact:', error.message);
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
