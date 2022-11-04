const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('models/contacts.json');

const parsedContacts = async () => {
  try {
    const contactsList = await fs.readFile(contactsPath, 'utf-8');
    const contactsData = JSON.parse(contactsList);
    return contactsData;
  } catch (error) {
    return error.message;
  }
};

const listContacts = async () => {
  try {
    return await parsedContacts();
  } catch (error) {
    return error.message;
  }
};

const getContactById = async contactId => {
  try {
    const contactsList = await parsedContacts();
    const resultData = contactsList.find(contact => contact.id === contactId);
    return resultData;
  } catch (error) {
    return error.message;
  }
};

const removeContact = async contactId => {
  try {
    const contactsList = await parsedContacts();
    const removedData = contactsList.find(contact => contact.id === contactId);
    const updatedContacts = contactsList.filter(
      contact => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return removedData;
  } catch (error) {
    return error.message;
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contactsList = await parsedContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    contactsList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList));
    return newContact;
  } catch (error) {
    return error.message;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await parsedContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...body };
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return contacts[index];
    }
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
