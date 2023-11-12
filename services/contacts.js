//const fs = require('fs').promises;
//const path = require('path');

const Contacts = require('../models/contacts');

//const pathContacts = path.join(__dirname, '../db/contacts.json');

const loadContacts = async () => {
  try {
    const contacts = await Contacts.find();
    return {
      success: true,
      result: contacts,
      message: 'List of contacts',
    };
  } catch (error) {
    console.error('Error reading JSON data:', error);
  }
};

const saveContacts = async contacts => {
  await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));
};

const listContacts = loadContacts;

const getContactById = async id => {
  try {
    const contact = await Contacts.findById(id);
    return {
      success: true,
      result: contact,
      message: 'List of contact',
    };
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
    const contactRegistered = await Contacts.create(body);
    return {
      success: true,
      result: contactRegistered,
      message: 'contact registered successfully.',
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: 'Missing required name, email, or phone ',
    };
  }
};

const updateContact = async (id, body) => {
  try {
    const contact = await Contacts.findByIdAndUpdate(id, body);

    if (contact) {
      return {
        success: true,
        result: contact,
        message: 'The contact was updated successfully.',
      };
    } else
      return {
        success: false,
        result: null,
        message: 'Not found',
      };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const removeContact = async id => {
  try {
    const contact = await Contacts.findByIdAndDelete(id);
    return {
      success: true,
      result: contact,
      message: 'The contact was deleted successfully.',
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
