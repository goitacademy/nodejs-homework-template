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

async function saveContacts(contacts) {
  await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));
}

const listContacts = loadContacts;

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
    await saveContacts(contacts);

    return body;
  } catch (error) {
    throw error;
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
