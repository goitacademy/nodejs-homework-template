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
    console.log(contactRegistered);
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

const updateContact = async (contactId, body) => {
  try {
    console.log(body);
    const contacts = await loadContacts();
    const contactIndex = contacts.findIndex(c => c.id == contactId);

    if (contactIndex !== -1) {
      if (!body || Object.keys(body).length === 0) {
        return {
          success: true,
          result: null,
          message: 'Missing fields',
        };
      }
      contacts[contactIndex] = { ...contacts[contactIndex], ...body };

      await saveContacts(contacts);
      return {
        success: true,
        result: contacts[contactIndex],
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

const removeContact = async contactId => {
  try {
    const contacts = await loadContacts();
    const contactIndex = contacts.findIndex(c => c.id == contactId);

    if (contactIndex !== -1) {
      const removedContact = contacts.splice(contactIndex, 1)[0];
      await saveContacts(contacts);
      return {
        success: true,
        result: removedContact,
        message: 'The contact was deleted successfully.',
      };
    } else {
      return {
        success: false,
        result: null,
        message: 'Contact not found.',
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
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
