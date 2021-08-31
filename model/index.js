/* eslint-disable no-useless-catch */
const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');
// const contacts = require('./contacts.json')

const filePath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(filePath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const selectContact = contacts.find(({ id }) => String(id) === contactId);
    if (!selectContact) {
      return null;
    }
    return selectContact;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(filePath);
    const contacts = JSON.parse(data);
    const idx = contacts.findIndex(({ id }) => String(id) === contactId);
    if (idx === -1) {
      return null;
    }
    const newContacts = contacts.filter(({ id }) => String(id) !== contactId);
    await fs.writeFile(filePath, JSON.stringify(newContacts));
    return contacts[idx];
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const newContact = { id: v4(), ...body };
    const data = await fs.readFile(filePath);
    const contacts = JSON.parse(data);
    const contactList = [...contacts, newContact];
    await fs.writeFile(filePath, JSON.stringify(contactList));
    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(filePath);
    const contacts = JSON.parse(data);
    const idx = contacts.findIndex(({ id }) => String(id) === contactId);
    if (idx === -1) {
      return null;
    }
    contacts[idx] = { ...contacts[idx], ...body };
    await fs.writeFile(filePath, JSON.stringify(contacts));
    return contacts[idx];
  } catch (error) {
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
