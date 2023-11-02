const fs = require('fs').promises;
const path = require('path');

const pathContacts = path.join(__dirname, '../models/contacts.json');

const loadContacts = async () => {
  try {
    const result = (await fs.readFile(pathContacts)).toString();
    return JSON.parse(result);
  } catch (error) {
    console.error('Error reading JSON data:', error);
  }
};

const listAllContacts = loadContacts;

const getContactById = async contactId => {
  try {
    const contacts = await loadContacts();
    const contact = contacts.find(c => c.id == contactId);
    return contact;
  } catch (error) {
    return {
      success: false,
      result: null,
      message: 'Contact not found',
    };
  }
};

const addContact = async body => {
  try {
    const contacts = await loadContacts();
    contacts.push(body);
    fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2), 'utf-8');

    return body;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await loadContacts();
    const contactIndex = contacts.findIndex(c => c.id == contactId);

    if (contactIndex !== -1) {
      contacts[contactIndex] = { ...contacts[contactIndex], ...body };

      await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));

      return {
        success: true,
        result: contacts[contactIndex],
        message: 'The contact was updated successfully.',
      };
    } else {
      return {
        success: false,
        result: null,
        message: 'Contact not found',
      };
    }
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await loadContacts();
    const contact = contacts.findIndex(c => c.id == contactId);

    if (contact !== -1) {
      contacts.splice(contact, 1);

      await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));

      return {
        success: true,
        result: null,
        message: 'The contact was deleted successfully.',
      };
    } else {
      return {
        success: false,
        result: null,
        message: 'missing fields',
      };
    }
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

module.exports = {
  listAllContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
